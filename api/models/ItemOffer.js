const Sequelize = require('sequelize');
const db = require('../config/database');


const ItemOffer = db.define('itemOffer', {
  offerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  offeringUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sellOrderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  offerAmount: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: false
  }
});

module.exports = ItemOffer;