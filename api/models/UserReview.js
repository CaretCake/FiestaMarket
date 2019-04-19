module.exports = (sequelize, type) => {
  return sequelize.define('UserReviews', {
    ReviewText: {
      type: type.STRING(300),
      allowNull: false,
      validate: {
        len: {
          args: [5, 300],
          msg: 'Review message must be between 5 and 300 characters'
        },
        notNull: true,
        notEmpty: true
      }
    }
  })
}