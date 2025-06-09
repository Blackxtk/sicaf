const boom = require('@hapi/boom');

const { models } = require ('./../libs/sequelize');


class OrdersService{

    async create(userId){
        const costumer = await models.costumer.findOne({
            where: {
                '$user.id$': userId
            },
            include: [
                {
                association: 'user',
                }
            ]
        })
        const newOrder = await models.Order.create({
            costumerId: costumer.id
        });
        return newOrder;
    }

    async addItem(data){
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    async find(){
        const rta = await models.Order.findAll({
            include: [
                {
                association: 'costumer',
                include: ['user']
                },
                'items'
            ]
        });
        return rta;
    }

    async findByUser(userId){
        const orders = await models.Order.findAll({
            where: {
                '$costumer.user.id$': userId
            },
            include: [
                {
                association: 'costumer',
                include: ['user']
                }
            ]
        });
        return orders;
    }

    async findOne(id){
        const order = await models.Order.findByPk(id, {
            include: [
                {
                association: 'costumer',
                include: ['user']
                },
                'items'
            ]
        });
        if(!order){
            throw boom.notFound('Order is not found');
        }else{
            return order;
        }
        // !order ? throw boom.notFound('Oders is not found') : return order;
    }

    async update(id, data){
        const order = await this.findOne(id);
        const rta = await order.update(data);
        return rta;
    } 

    async delete(id){
        const order = await this.findOne(id);
        await order.destroy(id);
        return { id };
    }
}

module.exports = OrdersService