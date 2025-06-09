const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

class CostumersService{

    async create(data){
        const hash = await bcrypt.hash(data.user.password, 10);
        const newData ={
            ...data,
            user:{
                ...data.user,
                password: hash
            }
        }
        const newCostumer = await models.costumer.create(newData, {
            include: ['user']
        })
        delete newCostumer.dataValues.user.dataValues.password;
        return newCostumer;
    }

    async find(){
        const rta = await models.costumer.findAll({
            include: ['user']
        });
        return rta;
    }
    async findOne(id){
        const costumer = await models.costumer.findByPk(id);
        if(!costumer){
            throw boom.notFound('Costumer not Found')
        }else{
        return costumer;
        }
    }
    async update(id, changes){
        const costumer = await this.findOne(id);
        const rta = await costumer.update(changes);
        return rta;
    }
    async delete (id){
        const costumer = await this.findOne(id);
        await costumer.destroy();
        return { id };
    }
}

module.exports = CostumersService;