var express = require('express');
var router = express.Router();
const { SellOrder } = require('../config/database');

//Get SellOrder list
router.get('/', (req, res) => {
  SellOrder.findAll()
    .then(sellOrders => {
      console.log(sellOrders);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

//Add a SellOrder
router.get('/add', (req, res) => {
  const data = {
    Price: '',
    OpenToOffers: '',
    SaleStatus: '',
    Server: '',
    Enhancement: '',
    End: '',
    Dex: '',
    Int: '',
    Str: '',
    Spr: '',
    Hp: '',
    Sp: '',
    Dmg: '',
    Mdmg: '',
    Def: '',
    Mdef: '',
    Aim: '',
    Eva: '',
    ItemItemId: '',
    UserUserId: '',
    PostingUserUserId: '',
    PostedItemItemId: ''
  }

  let { PriceMin,
    PriceMax,
    OrderStatus,
    Server,
    Enhancement,
    End,
    Dex,
    Int,
    Str,
    Spr,
    Hp,
    Sp,
    Dmg,
    Mdmg,
    Def,
    Mdef,
    Aim,
    Eva,
    ItemItemId,
    UserUserId,
    PostingUserUserId,
    PostedItemItemId } = data;

  SellOrder.create({
    PriceMin,
    PriceMax,
    OrderStatus,
    Server,
    Enhancement,
    End,
    Dex,
    Int,
    Str,
    Spr,
    Hp,
    Sp,
    Dmg,
    Mdmg,
    Def,
    Mdef,
    Aim,
    Eva,
    ItemItemId,
    UserUserId,
    PostingUserUserId,
    PostedItemItemId
  })
    .then(sellOrder => res.redirect('/'))
    .catch(err => console.log(err));
});


//Get SellOrder by id
router.get('/:sellOrderId?', (req, res) => {
  let query;
  if(req.params.sellOrderId) {
    query = BuyOrder.findAll(
      { where: { BuyOrderId: req.params.sellOrderId }})
  } else {
    query = SellOrder.findAll({ include: [ SellOrder ]})
  }
  return query.then(sellOrders => res.json(sellOrders))
});

module.exports = router;