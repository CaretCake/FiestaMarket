const Sequelize = require('sequelize');
const db = require('../config/database');


const SellOrder = db.define('sellOrder', {
  sellOrderId: {
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
  price: {
    type: Sequelize.DECIMAL(18,0),
    allowNull: false
  },
  openToOffers: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  saleStatus: {
    type: Sequelize.ENUM('active', 'pending', 'sold', 'expired'),
    allowNull: false
  },
  enhancement: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  end: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  dex: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  int: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  str: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  spr: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  hp: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  sp: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  dmg: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  mdmg: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  def: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  mdef: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  aim: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  eva: {
    type: Sequelize.INTEGER,
      allowNull: false
  },
  lastUpdated: {
    type: Sequelize.DATE,
      allowNull: false
  }
});

module.exports = SellOrder;