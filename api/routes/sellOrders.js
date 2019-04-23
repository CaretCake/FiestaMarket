const express = require('express');
const router = express.Router();
const { SellOrder, User, Alias, Item, ItemOffer } = require('../config/database');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get sell order list
router.get('/', (req, res) => {
  SellOrder.findAll({
    where: { SaleStatus: { [Op.notIn]: ['sold', 'expired'] } },
    include: [
      { model: User,
        as: 'PostingUser',
        attributes: { exclude: ['pass', 'updatedAt', 'createdAt', 'email', 'role'] },
        include: [
          {
            model: Alias,
            as: 'Aliases',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }]
      },
      {
        model: Item,
        as: 'PostedItem',
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      { model: ItemOffer,
        as: 'Offers',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: User,
            as: 'OfferingUser',
            attributes: { exclude: ['pass', 'updatedAt', 'createdAt', 'email', 'role'] }
          }]
      }
    ],
    order: [
      ['updatedAt', 'DESC'],
      [ { model: User, as: 'PostingUser' }, { model: Alias, as: 'Aliases' }, 'Preferred', 'DESC' ]
    ]
  })
    .then(orders => {
      let resStatus;
      orders !== null ? resStatus = 200 : resStatus = 404;
      res.status(resStatus).json(orders);
    })
    .catch(err => console.log(err));
});

//Add a SellOrder
router.post('/add', isAuthenticated, (req, res) => {
  console.log('price: ' + req.body.price);

  SellOrder.create({
    Price: req.body.price,
    OpenToOffers: req.body.openToOffers,
    SaleStatus: 'active',
    Server: req.body.server,
    Enhancement: req.body.enhancement,
    End: req.body.end,
    Dex: req.body.dex,
    Int: req.body.int,
    Str: req.body.str,
    Spr: req.body.spr,
    Hp: req.body.hp,
    Sp: req.body.sp,
    Dmg: req.body.dmg,
    Mdmg: req.body.mdmg,
    Def: req.body.def,
    Mdef: req.body.mdef,
    Aim: req.body.aim,
    Eva: req.body.eva,
    ItemItemId: req.body.itemId,
    UserUserId: req.user.userId,
    PostingUserUserId: req.user.userId,
    PostedItemItemId: req.body.itemId
  })
    .then(sellOrder => {
      if (sellOrder) {
        return res.status(201).json({ message: 'success' });
      }
    })
    .catch(function (error) {
      // print the error details
      //console.log('message: ' + JSON.stringify(error.errors));
      //console.log('type: ' + JSON.stringify(error.errors[0].type));
      res.status(409).json({ error });
    });
});

//Get SellOrder by id
router.get('/:sellOrderId?', (req, res) => {
  let query;
  if(req.params.sellOrderId) {
    query = SellOrder.findAll(
      { where: { BuyOrderId: req.params.sellOrderId }});
  } else {
    query = SellOrder.findAll({ include: [ SellOrder ]});
  }
  return query.then(sellOrders => res.json(sellOrders));
});

module.exports = router;