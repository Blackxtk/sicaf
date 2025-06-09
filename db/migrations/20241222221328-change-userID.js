'use strict';
const { DataTypes } = require('sequelize');

const { COSTUMER_TABLE } = require('../models/costumersModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(COSTUMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true
    });
  },

  async down (queryInterface) {
    // await queryInterface.changeColumn(COSTUMER_TABLE, 'user_id', CostumerSchema);
  }
};
