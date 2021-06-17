'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    //You must return a promise
    return queryInterface.createTable('user', {
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(35),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(35),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      //Those are added by default on insertion (make sure to create the their columns)
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  down: (queryInterface, DataTypes) => {
    //Return a promise that drops a table in case of (migration:undo)
    return queryInterface.dropTable('user');
  },
};
