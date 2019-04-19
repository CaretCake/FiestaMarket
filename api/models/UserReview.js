module.exports = (sequelize, type) => {
  return sequelize.define('UserReviews', {
    ReviewText: {
      type: type.STRING(300),
      allowNull: false,
      validate: {
        len: [0, 300],
        notNull: true,
        notEmpty: true
      }
    }
  })
}