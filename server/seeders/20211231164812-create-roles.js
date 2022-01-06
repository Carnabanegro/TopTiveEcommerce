'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let Roles = [
      {name: 'Admin',createdAt: new Date(), updatedAt: new Date()},
      {name: 'User',createdAt: new Date(), updatedAt: new Date()}
    ]
     await queryInterface.bulkInsert('roles',Roles, {});

  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('roles', null, {});

  }
};
