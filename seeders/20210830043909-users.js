'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("users",[
    {
      "id" : 1,
      "email": "admin@waysbucks.id",
      "password" : "$2b$10$WfJbMbdvwU4SwnnzO2krGeJ2qPXnKM6cnj/MuebhoaRSsN7Ynibt6",
      "fullName" : "Waysbucks Admin",
      "status" : "admin",
      "createdAt" : Sequelize.literal('CURRENT_TIMESTAMP'),
      "updatedAt" : Sequelize.literal('CURRENT_TIMESTAMP')
    },
    {
      "id" : 2,
      "email": "user@waysbucks.id",
      "password" : "$2b$10$WfJbMbdvwU4SwnnzO2krGeJ2qPXnKM6cnj/MuebhoaRSsN7Ynibt6",
      "fullName" : "Waysbucks Customer",
      "status" : "user",
      "createdAt" : Sequelize.literal('CURRENT_TIMESTAMP'),
      "updatedAt" : Sequelize.literal('CURRENT_TIMESTAMP')
    }
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
