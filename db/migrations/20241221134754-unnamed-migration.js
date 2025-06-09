'use strict';

const { UserSchema, USER_TABLE } = require('./../models/usersModel');
const { CostumerSchema, COSTUMER_TABLE } = require('./../models/costumersModel');
const { CategorySchema, CATEGORY_TABLE } = require('./../models/categoriesModel');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/productsModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(COSTUMER_TABLE, CostumerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(COSTUMER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
