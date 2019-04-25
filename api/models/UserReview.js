module.exports = (sequelize, type) => {
  return sequelize.define('UserReviews', {
    isPositive: {
      type: type.TINYINT,
      allowNull: false
    }
  });
};