const Sequelize = require('sequelize');
const db = require('../config/database');


const User = db.define('Users', {
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  UserName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  Pass: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Salt: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  Status: {
    type: Sequelize.ENUM('online', 'in-game', 'offline'),
    allowNull: false
  }
});

module.exports = User;