const Sequelize = require('sequelize');
const db = require('../config/database');


const Alias = db.define('alias', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  aliasName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('discord', 'in-game'),
    allowNull: false
  },
  server: {
    type: Sequelize.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
  },
  preferred: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = Alias;