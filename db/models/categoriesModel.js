const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'category';

const CategorySchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nomCategory:{
        allowNull: false,
        field: 'nom_Category',
        type: DataTypes.STRING,
    },
    desCategory:{
            allowNull: false,
            type: DataTypes.STRING,
    },
    image:{
        allowNull: false,
        field: 'des_Category',
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class Category extends Model {
    static associate(models){
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'id_Category'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = { CATEGORY_TABLE, Category, CategorySchema }