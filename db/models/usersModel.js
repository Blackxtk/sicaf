const { Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'user';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    numeroCedula: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        field: 'numero_Cedula',
    },
    tipoDocumento: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'tipo_Documento',
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
    },
    role:{
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'costumer'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class User extends Model {
    static associate(models){
        this.hasOne(models.costumer,{
            foreignKey: 'userId'
        })
    }
    static config(sequelize) {
        return{
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, User, UserSchema}