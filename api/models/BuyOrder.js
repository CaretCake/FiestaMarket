const Sequelize = require('sequelize');
const db = require('../config/database');


const BuyOrder = db.define('buyOrder', {
  buyOrderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceMin: {
    type: Sequelize.DECIMAL(18,0),
    allowNull: false
  },
  priceMax: {
    type: Sequelize.DECIMAL(18,0),
    allowNull: false
  },
  orderStatus: {
    type: Sequelize.ENUM('active', 'bought', 'expired'),
    allowNull: false
  },
  desiredEnhancement: {
    type: Sequelize.ENUM('+12', '+11', '+10', '+9', 'N/A'),
    allowNull: false
  },
  desiredEnd: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredDex: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredInt: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredStr: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredSpr: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredHp: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredSp: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredDmg: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredMdmg: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredDef: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredMdef: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredAim: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  desiredEva: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  lastUpdated: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = BuyOrder;