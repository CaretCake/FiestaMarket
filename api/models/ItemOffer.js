module.exports = (sequelize, type) => {
  return sequelize.define('ItemOffers', {
    OfferId: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    OfferAmount: {
      type: type.DECIMAL(18, 0),
      allowNull: false
    }
  })
}