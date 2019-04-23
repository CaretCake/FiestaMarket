const express = require('express');
const router = express.Router();
const { BuyOrder } = require('../config/database');
const isAuthenticated = require('../config/middleware/isAuthenticated');

//Add a BuyOrder
router.post('/add', isAuthenticated, (req, res) => {
  console.log(JSON.stringify(req.body));

  BuyOrder.create({
    PriceMin: req.body.priceMin,
    PriceMax: req.body.priceMax,
    OrderStatus: 'active',
    Server: req.body.server,
    DesiredEnhancement: req.body.enhancement,
    DesiredEnd: req.body.end,
    DesiredDex: req.body.dex,
    DesiredInt: req.body.int,
    DesiredStr: req.body.str,
    DesiredSpr: req.body.spr,
    DesiredHp: req.body.hp,
    DesiredSp: req.body.sp,
    DesiredDmg: req.body.dmg,
    DesiredMdmg: req.body.mdmg,
    DesiredDef: req.body.def,
    DesiredMdef: req.body.mdef,
    DesiredAim: req.body.aim,
    DesiredEva: req.body.eva,
    PostingUserUserId: req.body.userId,
    PostedItemItemId: req.body.itemId,
    ItemItemId: req.body.itemId,
    UserUserId: req.body.userId
  })
    .then(buyOrder => {
      if (buyOrder) {
        return res.status(201).json({ message: 'success' });
      }
    })
    .catch(function (error) {
      // print the error details
      console.log('message: ' + JSON.stringify(error));
      //console.log('type: ' + JSON.stringify(error.errors[0].type));
      res.status(409).json({ error });
    });
});


//Get BuyOrder by id
router.get('/:buyOrderId?', (req, res) => {
  let query;
  if(req.params.buyOrderId) {
    query = BuyOrder.findAll(
      { where: { BuyOrderId: req.params.buyOrderId }});
  } else {
    query = BuyOrder.findAll({ include: [ BuyOrder ]});
  }
  return query.then(buyOrders => res.json(buyOrders));
});

module.exports = router;