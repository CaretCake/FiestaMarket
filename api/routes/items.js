const express = require('express');
const router = express.Router();
const { Item, ItemOffer, SellOrder, BuyOrder, User } = require('../config/database');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get item list
router.get('/', (req, res) => {
  Item.findAll()
    .then(items => {
      res.json(items);
    })
    .catch(err => res.status(500).json({ message: "Server error" }));
});

//Search for items
router.get('/search', (req, res) => {
  const term  = req.query.term;
  Item.findAll({
    where: { ItemName: { [Op.like]: '%' + term + '%' } },
    limit: 8
  })
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ message: "Server error" }));
});

//Get item by id
router.get('/:itemId?', (req, res) => {
  if (!req.params.itemId) {
    res.status(422).json({ message: 'no item provided' });
  } else {
    Item.findOne(
      { where: { ItemId: req.params.itemId },
        include: [
          { model: BuyOrder,
            as: 'BuyOrders',
            where: { OrderStatus: { [Op.notIn]: ['bought', 'expired'] } },
            required: false,
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
            where: { SaleStatus: { [Op.notIn]: ['sold', 'expired'] }},
            required: false,
            attributes: { exclude: ['createdAt'] },
            include: [
              {
                model: User,
                as: 'PostingUser',
                attributes: { exclude: ['pass', 'email', 'role', 'createdAt', 'updatedAt'] }
              },
              {
                model: ItemOffer,
                as: 'Offers'
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
    });
  }
});

//Get sell orders of item by id
router.get('/:itemId?/sell-orders', (req, res) => {
  if (!req.params.itemId) {
    res.status(422).json({ message: 'no item provided' });
  } else {
    SellOrder.findAll({
      where: { PostedItemItemId: req.params.itemId }
    }).then(items => {
        let resStatus;
        console.log(items);
        items !== null ? resStatus = 200 : resStatus = 404;
        res.status(resStatus).json(items);
      });
  }
});

// Create sell order of item
router.post('/:itemId?/sell-orders', isAuthenticated, (req, res) => {
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
    ItemItemId: req.params.itemId,
    UserUserId: req.user.userId,
    PostingUserUserId: req.user.userId,
    PostedItemItemId: req.params.itemId
  })
    .then(sellOrder => {
      if (sellOrder) {
        return res.status(201).json({ sellOrder });
      }
    })
    .catch(function (error) {
      if (error.errors) { // is SequelizeValidationError
        res.status(422).json({ message: error.errors[0].message, field: error.errors[0].path.toLowerCase() });
      } else {
        res.status(400).json({ message: error });
      }
    });
});

//Get buy orders of item by id
router.get('/:itemId?/buy-orders', (req, res) => {
  if (!req.params.itemId) {
    res.status(422).json({ message: 'no item provided' });
  } else {
    BuyOrder.findAll({
      where: { PostedItemItemId: req.params.itemId }
    }).then(items => {
        let resStatus;
        console.log(items);
        items !== null ? resStatus = 200 : resStatus = 404;
        res.status(resStatus).json(items);
      });
  }
});

// Create buy order of item
router.post('/:itemId?/buy-orders', isAuthenticated, (req, res) => {
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
    PostedItemItemId: req.params.itemId,
    ItemItemId: req.params.itemId,
    UserUserId: req.user.userId
  })
    .then(buyOrder => {
      if (buyOrder) {
        return res.status(201).json({ buyOrder });
      }
    })
    .catch(function (error) {
      if (error.errors) { // is SequelizeValidationError
        res.status(422).json({ message: error.errors[0].message, field: error.errors[0].path.toLowerCase() });
      } else {
        res.status(400).json({ message: error });
      }
    });
});


/*----Averages Endpoints----*/
router.get('/:itemId?/sell-orders/average', (req, res) => {
  if(!req.params.itemId) {
    res.status(422).json({ message: 'no item provided' });
  } else {
    SellOrder.findAll({
      where: {
        PostedItemItemId: req.params.itemId
      },
      attributes: [[Sequelize.fn('AVG', Sequelize.col('Price')), 'average']]
    })
      .then(average => {
        if (average) {
          return res.status(201).json({ average });
        }
      })
      .catch(function (error) {
        if (error.errors) { // is SequelizeValidationError
          res.status(422).json({ message: error.errors[0].message, field: error.errors[0].path.toLowerCase() });
        } else {
          res.status(400).json({ message: error });
        }
      });
  }
});

router.get('/:itemId?/buy-orders/average', (req, res) => {
  if(!req.params.itemId) {
    res.status(422).json({ message: 'no item provided' });
  } else {
    BuyOrder.findAll({
      where: {
        PostedItemItemId: req.params.itemId
      },
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('PriceMin')), 'minAverage'],
        [Sequelize.fn('AVG', Sequelize.col('PriceMax')), 'maxAverage']
      ]
    })
      .then(average => {
        if (average) {
          return res.status(201).json({ average });
        }
      })
      .catch(function (error) {
        if (error.errors) { // is SequelizeValidationError
          res.status(422).json({ message: error.errors[0].message, field: error.errors[0].path.toLowerCase() });
        } else {
          res.status(400).json({ message: error });
        }
      });
  }
});


module.exports = router;