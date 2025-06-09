'use strict';

const { ORDER_TABLE, OrderSchema } = require('./../models/ordersModel');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
