const express = require('express');
const router = express.Router();
const { SellOrder } = require('../config/database');
const isAuthenticated = require('../config/middleware/isAuthenticated');


//Add a SellOrder
router.post('/add', isAuthenticated, (req, res) => {

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
    UserUserId: req.body.userId,
    PostingUserUserId: req.body.userId,
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
      if (error.errors[0].type === 'unique violation') {
        res.status(409).json({ message: error.errors[0].message, field: error.errors[0].path });
      }
    });
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