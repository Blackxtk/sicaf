const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./usersModel');


const COSTUMER_TABLE = 'costumer';

const CostumerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    costumerName:{
        allowNull: false,
        field: 'costumer_name',
        type: DataTypes.STRING,
    },
    lastName:{
        allowNull: false,
        field: 'last_Name',
        type: DataTypes.STRING,
    },
    phone:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_At',
        defaultValue: Sequelize.NOW
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }
}

class Costumer extends Model {
    static associate(models){
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order,{
        as: 'orders',
        foreignKey: 'costumerId'
    });
}
    static config(sequelize){
        return{
            sequelize,
            tableName: COSTUMER_TABLE,
            modelName: 'costumer',
            timestamps: false
        }
    }
}

module.exports = { COSTUMER_TABLE, Costumer, CostumerSchema }