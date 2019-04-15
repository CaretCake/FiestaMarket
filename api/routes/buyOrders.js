var express = require('express');
var router = express.Router();
const { BuyOrder } = require('../config/database');

//Get BuyOrder list
router.get('/', (req, res) => {
  BuyOrder.findAll()
    .then(buyOrders => {
      console.log(buyOrders);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

//Add a BuyOrder
router.get('/add', (req, res) => {
  const data = {
    PriceMin: '',
    PriceMax: '',
    OrderStatus: '',
    Server: '',
    DesiredEnhancement: '',
    DesiredEnd: '',
    DesiredDex: '',
    DesiredInt: '',
    DesiredStr: '',
    DesiredSpr: '',
    DesiredHp: '',
    DesiredSp: '',
    DesiredDmg: '',
    DesiredMdmg: '',
    DesiredDef: '',
    DesiredMdef: '',
    DesiredAim: '',
    DesiredEva: '',
    PostingUserUserId: '',
    PostedItemItemId: '',
    ItemItemId: '',
    UserUserId: ''
  }

  let { PriceMin,
    PriceMax,
    OrderStatus,
    Server,
    DesiredEnhancement,
    DesiredEnd,
    DesiredDex,
    DesiredInt,
    DesiredStr,
    DesiredSpr,
    DesiredHp,
    DesiredSp,
    DesiredDmg,
    DesiredMdmg,
    DesiredDef,
    DesiredMdef,
    DesiredAim,
    DesiredEva,
    PostingUserUserId,
    PostedItemItemId,
    ItemItemId,
    UserUserId } = data;

  BuyOrder.create({
    PriceMin,
    PriceMax,
    OrderStatus,
    Server,
    DesiredEnhancement,
    DesiredEnd,
    DesiredDex,
    DesiredInt,
    DesiredStr,
    DesiredSpr,
    DesiredHp,
    DesiredSp,
    DesiredDmg,
    DesiredMdmg,
    DesiredDef,
    DesiredMdef,
    DesiredAim,
    DesiredEva,
    PostingUserUserId,
    PostedItemItemId,
    ItemItemId,
    UserUserId
  })
    .then(buyOrder => res.redirect('/'))
    .catch(err => console.log(err));
});


/Get BuyOrder by id
router.get('/:buyOrderId?', (req, res) => {
  let query;
  if(req.params.buyOrderId) {
    query = BuyOrder.findAll(
      { where: { BuyOrderId: req.params.buyOrderId }})
  } else {
    query = BuyOrder.findAll({ include: [ BuyOrder ]})
  }
  return query.then(buyOrders => res.json(buyOrders))
});

module.exports = router;