const express = require('express');
const router = express.Router();
const { BuyOrder, User, Alias, Item } = require('../config/database');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isAdmin = require('../config/middleware/isAdmin');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get buy order list
router.get('', (req, res) => {
  BuyOrder.findAll({
    where: { OrderStatus: { [Op.notIn]: ['bought', 'expired'] } },
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
      }
    ],
    order: [ ['updatedAt', 'DESC'] ]
  })
    .then(orders => {
      let resStatus;
      orders !== null ? resStatus = 200 : resStatus = 404;
      res.status(resStatus).json(orders);
    })
    .catch(err => res.status(500).json({ message: "Server error" }));
});

// Create a BuyOrder
router.post('', isAuthenticated, (req, res) => {
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
    PostingUserUserId: req.user.userId,
    PostedItemItemId: req.body.itemId,
    ItemItemId: req.body.itemId,
    UserUserId: req.user.userId
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

// Get BuyOrder by id
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

// Delete a buy order
router.delete('/:id', isAuthenticated, isAdmin, (req, res) => {
  BuyOrder.findByPk(req.params.id)
    .then(buyOrder => {
      if (!buyOrder) {
        return res.status(404).json({
          message: 'buy order not found',
        });
      }
      return buyOrder
        .destroy()
        .then(() => res.status(204).json())
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
});

module.exports = router;