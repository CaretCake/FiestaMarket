var express = require('express');
var router = express.Router();
const { Item, SellOrder, BuyOrder, User } = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get item list
router.get('/', (req, res) =>
  Item.findAll()
    .then(items => {
      console.log(items);
      res.sendStatus(200);
    })
    .catch(err => console.log(err)));


//Search for items
router.get('/search', (req, res) => {
  const term  = req.query.term;
  Item.findAll({
    where: { ItemName: { [Op.like]: '%' + term + '%' } },
    order: [
      ['ItemName', 'ASC']
    ],
    limit: 8
  })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

//Get item by id
router.get('/:itemId?', (req, res) => {
  if(req.params.itemId) {
    Item.findOne(
      { where: { ItemId: req.params.itemId },
        include: [
          { model: BuyOrder,
            as: 'BuyOrders',
            attributes: { exclude: ['createdAt'] },
            include: [
              {
                model: User,
                as: 'PostingUser',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              }]
          },
          { model: SellOrder,
            as: 'SellOrders',
            attributes: { exclude: ['createdAt'] },
            include: [
              {
                model: User,
                as: 'PostingUser',
                attributes: { exclude: ['pass', 'email', 'role', 'createdAt', 'updatedAt'] }
              }]
          }
        ],
        order: [
          [ { model: SellOrder, as: 'SellOrders' }, 'updatedAt', 'DESC'],
          [ { model: BuyOrder, as: 'BuyOrders' }, 'updatedAt', 'DESC']
        ]
    }).then(item => {
      let resStatus;
      console.log(item);
      item !== null ? resStatus = 200 : resStatus = 404;
      res.status(resStatus).json(item);
    })
  }
});

//Get sell orders of item by id
router.get('/:itemId?/sellOrders', (req, res) => {
  if(req.params.itemId) {
    SellOrder.findAll({
      where: { PostedItemItemId: req.params.itemId }
    }).then(items => {
        let resStatus;
        console.log(items);
        items !== null ? resStatus = 200 : resStatus = 404;
        res.status(resStatus).json(items);
      })
  }
});

//Get buy orders of item by id
router.get('/:itemId?/buyOrders', (req, res) => {
  if(req.params.itemId) {
    BuyOrder.findAll({
      where: { PostedItemItemId: req.params.itemId }
    }).then(items => {
        let resStatus;
        console.log(items);
        items !== null ? resStatus = 200 : resStatus = 404;
        res.status(resStatus).json(items);
      })
  }
});

module.exports = router;