const UserService=  require('./usersService');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const nodemailer = require("nodemailer");

class AuthService{
    async getUser(email, password){
        const user = await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;
        return user;
    }

    signToken(user){
            const payload = {
                sub: user.id,
                role: user.role
            }
            const token = jwt.sign(payload, config.jwtSecret);
            return{
                user, 
                token
            };
    }

    async sendRecovery(email){
        const user = await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }const payload = {
            sub: user.id
        }
        const token = jwt.sign(payload, config.jwtSecretRec, {expiresIn: '15min'});
        const link = `http://front.com/recovery?token=${token}`;
        await service.update(user.id,{recoveryToken: token});
        const mail = {
            from: config.mailPass, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Recuperación de contraseña", // Subject line
            html: `<b>Ingresa a este link para recuperar contraseña: ${link}</b>`// html body
          //   attachments: [
          //     {   // file on disk as an attachment
          //         filename: 'prueba.html',
          //         path: './prueba.html' // stream this file
          //     }
          //   ]
          }
          const rta = await this.sendMail(mail);
          return rta;
    }

    async changePass(token, newPass){
        try{
            
            const payload= jwt.verify(token, config.jwtSecretRec);
            const user = await service.findOne(payload.sub);
            if(user.recoveryToken !== token){
                throw boom.unauthorized();
            }
            const hash = await bcrypt.hash(newPass,10)
            await service.update(user.id,{recoveryToken:null, password:hash});
            return {message: 'Password Change'}
        }catch(error){
            throw boom.unauthorized();
        }
    }

    async sendMail(infoMail){
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.mail,
                pass: config.mailPass
            }
        });
        await transporter.sendMail(infoMail);
        return { message: 'mail sent' };
    }
}

module.exports = AuthService;