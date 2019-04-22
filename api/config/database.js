const Sequelize = require('sequelize');

const aliasModel = require('../models/Alias.js');
const buyOrderModel = require('../models/BuyOrder.js');
const itemModel = require('../models/Item.js');
const itemOfferModel = require('../models/ItemOffer.js');
const sellOrderModel = require('../models/SellOrder.js');
const userModel = require('../models/User.js');
const userReviewModel = require('../models/UserReview.js');

const sequelize = new Sequelize('fiestadb', 'dbmasteruser', ',h$<K7NRZ39:4]:D<81jer6Wq8NU<i-3', {
  host      : 'ls-b06b26de74c4aac85f292fdb2330847cf1f525d0.cmzli6sne7su.us-east-1.rds.amazonaws.com',
  port      : '3306',
  dialect   : 'mysql',
  pool      : {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Alias = aliasModel(sequelize, Sequelize);
const BuyOrder = buyOrderModel(sequelize, Sequelize);
const Item = itemModel(sequelize, Sequelize);
const ItemOffer = itemOfferModel(sequelize, Sequelize);
const SellOrder = sellOrderModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const UserReview = userReviewModel(sequelize, Sequelize);

Alias.belongsTo(User);
BuyOrder.belongsTo(User, { as: 'PostingUser' });
BuyOrder.belongsTo(Item, { as: 'PostedItem' });
Item.hasMany(BuyOrder, { as: 'BuyOrders' });
Item.hasMany(SellOrder, { as: 'SellOrders' });
User.hasMany(Alias, { as: 'Aliases' });
User.hasMany(BuyOrder, { as: 'BuyOrders' });
User.hasMany(ItemOffer, { as: 'Offers' });
User.hasMany(SellOrder, { as: 'SellOrders' });
User.hasMany(UserReview, { foreignKey: 'reviewedUserId', as: 'ReceivedReviews' });
User.hasMany(UserReview, { foreignKey: 'reviewingUserId', as: 'WrittenReviews' });
UserReview.belongsTo(User, { foreignKey: 'reviewedUserId', as: 'ReviewedUser' });
UserReview.belongsTo(User, { foreignKey: 'reviewingUserId', as: 'ReviewingUser' });
ItemOffer.belongsTo(SellOrder, { as: 'SellOrder' });
ItemOffer.belongsTo(User, { as: 'OfferingUser' });
SellOrder.hasMany(ItemOffer, { as: 'Offers' });
SellOrder.belongsTo(User, { as: 'PostingUser' });
SellOrder.belongsTo(Item, { as: 'PostedItem' });

sequelize.sync({ })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  sequelize,
  User,
  BuyOrder,
  Item,
  ItemOffer,
  SellOrder,
  UserReview,
  Alias
}