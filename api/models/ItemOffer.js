module.exports = (sequelize, type) => {
  // noinspection JSUnresolvedVariable
  return sequelize.define('ItemOffers', {
    OfferId: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    OfferAmount: {
      type: type.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDecimal: {
          msg: 'Must be decimal value'
        },
        min: {
          args: [0],
          msg: 'Offer amount must be greater than 0'
        }
      }
    }
  });
};