const express = require('express');
const passport =  require('passport');
const jwt = require('jsonwebtoken');
const AuthService = require('./../services/authService');
const validatorHandler = require('./../middlewares/validatorHandler');
const {changePassSchema} = require('./../schemas/usersSchemas');
const service = new AuthService();


const router = express.Router();


router.post('/login',
    passport.authenticate('local', {session:false}),
    async (req, res, next) =>{
        try{
            const user = req.user;
            res.json(service.signToken(user))
        }catch (error){
            next(error);
        }
    });

    router.post('/recovery',
        async (req, res, next) =>{
            try{
                const { email } = req.body;
                const rta = await service.sendRecovery(email);
                res.json(rta);
            }catch (error){
                next(error);
            }
        });

    router.post('/changePass',
        validatorHandler(changePassSchema, 'body'),
        async (req, res, next) =>{
            try{
                const {token, password} = req.body;
                const rta = await service.changePass(token, password);
                res.json(rta);
            }catch(error){
                next(error);
            }
        }
    )
module.exports = router;
