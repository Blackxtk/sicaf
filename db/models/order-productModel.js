const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_TABLE } = require('./productsModel');
const { ORDER_TABLE } = require('./ordersModel');

const ORDER_PRODUCT_TABLE = 'order_product';

const OrderProductSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    orderId:{
        field: 'order_Id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references:{
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    productId:{
        field: 'product_Id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references:{
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    amount:{
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class OrderProduct extends Model {
    static associate(models){;
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        }
    }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct }