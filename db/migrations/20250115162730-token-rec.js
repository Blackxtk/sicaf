'use strict';

const { USER_TABLE, UserSchema} = require('./../models/usersModel')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', UserSchema.recoveryToken );
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
