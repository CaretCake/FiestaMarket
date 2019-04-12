const Sequelize = require('sequelize');
const db = require('../config/database');


const UserReview = db.define('userReview', {
  reviewedUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  reviewingUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  reviewText: {
    type: Sequelize.STRING(300),
    allowNull: false
  }
});

module.exports = UserReview;