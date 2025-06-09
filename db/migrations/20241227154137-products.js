'use strict';
// const {CategorySchema, CATEGORY_TABLE} = require('./../models/categoriesModel');
const {ProductSchema, PRODUCT_TABLE} = require('./../models/productsModel');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'id_Category', ProductSchema.idCategory);
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description);
  },

  async down (queryInterface) {
    // await queryInterface.removeColumn()
  }
};
