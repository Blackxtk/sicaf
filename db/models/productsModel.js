const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./categoriesModel');

const PRODUCT_TABLE = 'product';

const ProductSchema={
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    nombreProducto: {
        allowNull: false,
        field: 'nombre_Producto',
        type: DataTypes.STRING,
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    image: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
    createdAt: {
        allowNULL: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    idCategory: {
        field: 'id_Category',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }
}

class Product extends Model {
    static associate(models){
        this.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'id_Category'
        });
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = { PRODUCT_TABLE, Product, ProductSchema}