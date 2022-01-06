'use strict';
const {User} = require("../models/");
const bcrypt = require("bcrypt");

async function bPass(password){
    return  await bcrypt.hash(password,10);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

      let Users = [
        {name: 'admin', password: await bPass("12345"), fullName: 'pancho alderete', email: 'panchito@gmail.com', tel: '0358154636141', createdAt: new Date(), updatedAt: new Date()},
        {name: 'pserra', password: await bPass("678910"), fullName: 'patricio serra', email: 'patoserra74@hotmail.com', tel: '0351157865189', createdAt: new Date(), updatedAt: new Date()},
        {name: 'jperez', password: await bPass("111213"), fullName: 'juan perez', email: 'juanperez@hotmail.com', tel: '0351224242424', createdAt: new Date(), updatedAt: new Date()},
        {name: 'msanchez',password: await bPass("141516"), fullName: 'matias sanchez', email: 'matisanchez@hotmail.com', tel: '0351824242424', createdAt: new Date(), updatedAt: new Date()}
    ]

     await queryInterface.bulkInsert('users', Users, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
