const Sequelize = require('sequelize');
const db = require('../config/database');


const UserReview = db.define('UserReviews', {
  ReviewedUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: 'Users',
    referencesKey: 'UserId',
    allowNull: false
  },
  ReviewingUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: 'Users',
    referencesKey: 'UserId',
    allowNull: false
  },
  ReviewText: {
    type: Sequelize.STRING(300),
    allowNull: false
  }
});

module.exports = UserReview;