const Sequelize = require('sequelize');
const db = require('../config/database');


const SellOrder = db.define('SellOrders', {
  SellOrderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: 'Users',
    referencesKey: 'UserId',
    allowNull: false
  },
  ItemId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: 'Items',
    referencesKey: 'ItemId',
    allowNull: false
  },
  Price: {
    type: Sequelize.DECIMAL(18,0),
    allowNull: false
  },
  OpenToOffers: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  SaleStatus: {
    type: Sequelize.ENUM('active', 'pending', 'sold', 'expired'),
    allowNull: false
  },
  Enhancement: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  End: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Dex: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Int: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Str: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Spr: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Hp: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Sp: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Dmg: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Mdmg: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Def: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Mdef: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Aim: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  Eva: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  LastUpdated: {
    type: Sequelize.DATE,
      allowNull: false
  }
});

module.exports = SellOrder;