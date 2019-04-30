const express = require('express');
const router = express.Router();
const { SellOrder, User, Alias, Item, ItemOffer } = require('../config/database');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isAdmin = require('../config/middleware/isAdmin');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get sell order list
router.get('/', (req, res) => {
  SellOrder.findAll({
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
    .catch(err => res.status(500).json({ message: "Server error" }));
});

// Create a SellOrder
router.post('/', isAuthenticated, (req, res) => {
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

// Get SellOrder by id
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

// Delete a sell order
router.delete('/:id', isAuthenticated, isAdmin, (req, res) => {
  SellOrder.findByPk(req.params.id)
    .then(sellOrder => {
      if (!sellOrder) {
        return res.status(404).json({
          message: 'sell order not found',
        });
      }
      return sellOrder
        .destroy()
        .then(() => res.status(204).json())
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
});

// Create offer made on sell order
router.post('/:sellOrderId?/item-offers', isAuthenticated, (req, res) => {
  if(!req.params.sellOrderId) {
    res.status(422).json({ message: 'no order provided' });
  } else {
    ItemOffer.findOrCreate(
      { where: {
          OfferingUserUserId: req.user.userId,
          SellOrderSellOrderId: req.params.sellOrderId
      }, defaults: {
          OfferAmount: req.body.offerAmount,
          UserUserId: req.user.userId,
          OfferingUserUserId: req.user.userId,
          SellOrderSellOrderId: req.params.sellOrderId
      }})
      .then((offer, created) => {
        if (offer) {
          console.log("updating");
          ItemOffer.update(
            {
              OfferAmount: req.body.offerAmount || offer.OfferAmount
            },
            {
              where: {
                OfferingUserUserId: req.user.userId,
                SellOrderSellOrderId: req.params.sellOrderId }
            }
          ).then(() => {
            offer.OfferAmount = req.body.offerAmount;
            return res.status(201).json({ offer });
          });
        } else {
          return res.status(201).json({ created });
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

// Update offer made on sell order
router.put('/:sellOrderId?/item-offers/:offerId?', isAuthenticated, (req, res) => {
  if(!req.params.sellOrderId || !req.params.offerId) {
    res.status(422).json({ message: 'no order or offer provided' });
  } else {
    ItemOffer.findByPk(req.params.offerId)
      .then(offer => {
        if (!offer) {
          res.status(404).json({message: 'offer not found'});
        } else if (offer.OfferingUserUserId !== req.user.userId) {
          res.status(422).json({ message: 'user does not own offer' });
        } else {
          ItemOffer.update(
            {
              OfferAmount: req.body.offerAmount || review.OfferAmount
            },
            { where: {
                OfferId: req.params.offerId,
                SellOrderSellOrderId: req.params.sellOrderId }
            }
          )
            .then(() => {
              offer.offerAmount = req.body.offerAmount || offer.OfferAmount;
              res.status(200).send(offer);
            })
            .catch((error) => res.status(400).json({message: 'error updating review'}));
        }
      })
      .catch((error) => res.status(400).json({ message: 'error finding review' }));
  }
});


module.exports = router;