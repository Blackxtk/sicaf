const { Model, DataTypes, Sequelize } = require('sequelize');
const { COSTUMER_TABLE } = require('./costumersModel');

const ORDER_TABLE = 'order';

const OrderSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    costumerId:{
        field: 'costumer_Id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references:{
            model: COSTUMER_TABLE,
            key: 'id'
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    // total: {
    //     type: DataTypes.VIRTUAL,
    //     get() {
    //         if (this.items.length > 0){
    //             return this.items.reduce((total, item)=>{
    //                 return total + (item.price * item.OrderProduct.amount);
    //             }, 0);
    //         }
    //         return 0;
    //     }
    // }
}

class Order extends Model {
    static associate(models){
        this.belongsTo(models.costumer,{
            as: 'costumer',
        });
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
}

module.exports = { ORDER_TABLE, Order, OrderSchema }