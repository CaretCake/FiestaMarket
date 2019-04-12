const Sequelize = require('sequelize');
const db = require('../config/database');


const Alias = db.define('Aliases', {
  UserId: {
    type: Sequelize.INTEGER,
    references: 'Users', // <<< Note, its table's name, not object name
    referencesKey: 'UserId', // <<< Note, its a column name
    allowNull: false
  },
  AliasName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Type: {
    type: Sequelize.ENUM('discord', 'in-game'),
    allowNull: false
  },
  Server: {
    type: Sequelize.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
  },
  Preferred: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});


module.exports = Alias;