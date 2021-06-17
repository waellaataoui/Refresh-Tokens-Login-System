'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user',
      [
        {
          username: 'John',
          email: 'jhon@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Jane',
          email: 'jane@gmail.com',
          password: 'passw1234',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'test',
          email: 'test@gmail.com',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};
