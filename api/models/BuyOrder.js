const Sequelize = require('sequelize');
const db = require('../config/database');


const BuyOrder = db.define('BuyOrders', {
  BuyOrderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: 'Users', // <<< Note, its table's name, not object name
    referencesKey: 'UserId', // <<< Note, its a column name
    allowNull: false
  },
  ItemId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: 'Items', // <<< Note, its table's name, not object name
    referencesKey: 'ItemId', // <<< Note, its a column name
    allowNull: false
  },
  PriceMin: {
    type: Sequelize.DECIMAL(18,0),
    allowNull: false
  },
  PriceMax: {
    type: Sequelize.DECIMAL(18,0),
    allowNull: false
  },
  OrderStatus: {
    type: Sequelize.ENUM('active', 'bought', 'expired'),
    allowNull: false
  },
  DesiredEnhancement: {
    type: Sequelize.ENUM('+12', '+11', '+10', '+9', 'N/A'),
    allowNull: false
  },
  DesiredEnd: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredDex: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredInt: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredStr: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredSpr: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredHp: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredSp: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredDmg: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredMdmg: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredDef: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredMdef: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredAim: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  DesiredEva: {
    type: Sequelize.ENUM('godly', 'high', 'medium', 'N/A'),
    allowNull: false
  },
  LastUpdated: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = BuyOrder;