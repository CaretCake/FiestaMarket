const Sequelize = require('sequelize');
const db = require('../config/database');


const ItemOffer = db.define('ItemOffers', {
  OfferId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  OfferingUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  SellOrderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: 'SellOrders', // <<< Note, its table's name, not object name
    referencesKey: 'SellOrderId', // <<< Note, its a column name
    allowNull: false
  },
  OfferAmount: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: false
  }
});

module.exports = ItemOffer;