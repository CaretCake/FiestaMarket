const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 15;
const passport = require('../config/passport');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isAdmin = require('../config/middleware/isAdmin');
const isSameUser = require('../config/middleware/isSameUser');
const setUserStatus = require('../helpers/setUserStatus');
const { Alias, BuyOrder, Item, ItemOffer, SellOrder, User, UserReview } = require('../config/database');


/*---Main Users Routes---*/
// Get full user list - ADMIN ONLY
router.get('/', isAuthenticated, isAdmin, (req, res) => {
  User.findAll(
    { attributes: { exclude: ['pass'] }
    })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ message: "Server error" }));
});

// Get user by id
router.get('/:userId?', (req, res) => {
  if(!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  }
  User.findOne(
    { where: { userId: req.params.userId },
      attributes: { exclude: ['pass', 'email'] },
      include: [
        { model: Alias,
          as: 'Aliases',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        { model: BuyOrder,
          as: 'BuyOrders',
          attributes: { exclude: ['createdAt'] },
          include: [
            {
              model: Item,
              as: 'PostedItem',
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
              model: User,
              as: 'PostingUser',
              attributes: { exclude: ['createdAt', 'updatedAt', 'pass', 'email']}
            }]
        },
        { model: SellOrder,
          as: 'SellOrders',
          attributes: { exclude: ['createdAt'] },
          include: [
            {
              model: Item,
              as: 'PostedItem',
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
              model: ItemOffer,
              as: 'Offers',
              attributes: { exclude: ['updatedAt'] }
            },
            {
              model: User,
              as: 'PostingUser',
              attributes: { exclude: ['createdAt', 'updatedAt', 'pass', 'email']}
            }]
        },
        {
          model: ItemOffer,
          as: 'Offers',
          attributes: { exclude: ['updatedAt'] },
          include: [
            {
              model: SellOrder,
              as: 'SellOrder',
              attributes: { exclude: ['createdAt'] },
              include: [
                {
                  model: Item,
                  as: 'PostedItem',
                  attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                  model: User,
                  as: 'PostingUser',
                  attributes: { exclude: ['pass', 'email'] },
                  include: [
                    { model: Alias,
                      as: 'Aliases',
                      attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }]
                }]
            }]
        }
      ],
      order: [
        [ { model: Alias, as: 'Aliases' }, 'Preferred', 'DESC'],
        [ { model: SellOrder, as: 'SellOrders' }, 'updatedAt', 'DESC'],
        [ { model: BuyOrder, as: 'BuyOrders' }, 'updatedAt', 'DESC']
      ]
    })
    .then(user => {
      if (user === null) {
        res.status(404).json({ message: 'user not found' });
      }
      res.status(200).json({ user });
    })
    .catch(err => res.status(500).json({ message: 'error searching for user' }));
});

// Check user session
router.get('/:userId?/sessions', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'user ok' });
});

// Create a user
router.post('/', (req, res) => {
  bcrypt.hash(req.body.pass, saltRounds, function (err, hash){
    User.create({
      userName: req.body.username,
      email: req.body.email.toLowerCase(),
      pass: hash,
      status: 'offline'
    })
    .then(function(data) {
      if (data) {
        return res.status(201).json(data);
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
});

// Sign in user
router.post('/login', function(req,res,next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({message: info.message, user });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log('logged in user: ' + JSON.stringify(user));

      // Set user status to online
      setUserStatus('online', user.userId);
      user.status = 'online';

      delete user.pass;
      delete user.createdAt;
      delete user.updatedAt;
      return res.status(200).json({message: 'success', user });
    });
  })(req,res,next);
});

// Sign out user
router.post("/logout", function(req, res) {
  if(!req.body.userId) {
    res.status(422).json({ message: 'no user provided' });
  }

  // Set user status to offline
  setUserStatus('offline', req.body.userId);

  // Handle passport session logout and clear sid
  req.logout();
  req.session.destroy((err) => {
    res.status(204).clearCookie('connect.sid').json('Logged out');
  });
});

// Update user
router.put('/:userId?', isAuthenticated, isSameUser, (req, res) => {
  User.findByPk(req.user.userId,
    { attributes: { exclude: ['pass', 'email', 'createdAt', 'updatedAt'] }})
    .then(user => {
    if (!user) {
      res.status(404).json({error: 'user not found'});
    }
    User.update(
        {
          status: req.body.status || user.status,
          userName: req.body.username || user.userName
        },
        { where: { userId: req.user.userId } }
      )
      .then(() => {
        user.userName = req.body.username || user.userName;
        user.status = req.body.status || user.status;
        res.status(200).send(user);
      })
      .catch((error) => res.status(400).json(error));
  })
    .catch((error) => res.status(400).json(error));
});

// Delete a user - ADMIN ONLY
router.delete('/:userId?', isAuthenticated, isAdmin, (req, res) => {
  if(!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  }
  User.findByPk(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(400).json({
          message: 'user not found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).json())
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
});


/*---User Alias Routes---*/
// Get aliases of user by user id
router.get('/:userId?/aliases', (req, res) => {
  if(!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  }
  Alias.findAll(
    { where: { UserUserId: req.params.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [
        [ 'Preferred', 'DESC']
      ]
    })
    .then(alias => {
      if (alias === null) {
        res.status(404).json({ error: 'alias not found' });
      }
      res.status(200).json({ alias });
    })
    .catch(err => res.status(500).json({ error: 'error searching for alias' }));
});

// Create alias for user by user id
router.post('/:userId?/aliases', isAuthenticated, isSameUser, (req, res) => {
  Alias.create({
    AliasName: req.body.aliasName,
    Type: req.body.type,
    Server: req.body.server || null,
    Preferred: req.body.preferred,
    UserUserId: req.user.userId
  })
    .then(alias => {
      if (alias) {
        return res.status(201).json({ alias });
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

// Update alias at aliasId for user by user id
router.put('/:userId?/aliases/:aliasId?', isAuthenticated, isSameUser, (req, res) => {
  if(!req.params.aliasId) {
    res.status(422).json({ message: 'no alias provided' });
  } else {
    Alias.findByPk(req.params.aliasId)
      .then(alias => {
        if (!alias) {
          res.status(404).json({message: 'alias not found'});
        } else {
          Alias.update(
            {
              AliasName: req.body.aliasName || alias.AliasName,
              Type: req.body.type || alias.Type,
              Server: req.body.server || alias.Server,
              Preferred: req.body.preferred || alias.Preferred
            },
            { where: {
              userUserId: req.user.userId,
              id: req.params.aliasId }
            }
          )
            .then(() => {
              alias.AliasName = req.body.aliasName || alias.AliasName;
              alias.Type = req.body.type || alias.Type;
              alias.Server = req.body.server || alias.Server;
              alias.Preferred = req.body.preferred || alias.Preferred;
              res.status(200).send(alias);
            })
            .catch((error) => res.status(400).json({message: 'error updating alias'}));
        }
      })
      .catch((error) => res.status(400).json({ message: 'error finding alias' }));
  }
});

// Delete user alias
router.delete('/:userId?/aliases/:aliasId?', isAuthenticated, isSameUser, (req, res) => {
  if(!req.params.aliasId) {
    res.status(422).json({ message: 'no alias provided' });
  } else {
    Alias.findByPk(req.params.aliasId)
      .then(alias => {
        if (!alias) {
          return res.status(400).json({
            message: 'alias not found',
          });
        }
        return alias
          .destroy()
          .then(() => res.status(204).json())
          .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(400).json(error));
  }
});


/*---User User Review Routes---*/
// Get user reviews of user by user id
router.get('/:userId?/user-reviews', (req, res) => {
  if(!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  } else {
    UserReview.findAll(
      {
        where: {reviewedUserId: req.params.userId},
        attributes: {exclude: ['createdAt', 'updatedAt', 'reviewingUserId']}
      })
      .then(review => {
        if (review === null) {
          res.status(404).json({error: 'reviews not found'});
        }
        res.status(200).json({review});
      })
      .catch(err => res.status(500).json({error: 'error searching for reviews'}));
  }
});

// Create user reviews of user with userId
router.post('/:userId?/user-reviews', isAuthenticated, (req, res) => {
  if(!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  } else {
    UserReview.findOrCreate({
      where: {
        isPositive: req.body.isPositive,
        reviewedUserId: req.params.userId,
        reviewingUserId: req.user.userId
      }
    })
      .then((review, created) => {
        if (review) {
          return res.status(201).json({ review });
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

// Update user review at reviewId of user with userId
router.put('/:userId?/user-reviews/:reviewId?', isAuthenticated, (req, res) => {
  if(!req.params.reviewId || !req.params.userId) {
    res.status(422).json({ message: 'no user or review provided' });
  } else {
    UserReview.findByPk(req.params.reviewId)
      .then(review => {
        if (!review) {
          res.status(404).json({message: 'review not found'});
        } else if (review.reviewingUserId !== req.user.userId) {
          res.status(422).json({ message: 'user does not own review' });
        } else {
          UserReview.update(
            {
              isPositive: req.body.isPositive || review.isPositive,
              reviewedUserId: req.params.userId || review.reviewedUserId,
              reviewingUserId: req.user.userId || review.reviewingUserId
            },
            { where: {
                reviewedUserId: req.params.userId,
                reviewingUserId: req.user.userId,
                id: req.params.reviewId }
            }
          )
            .then(() => {
              review.isPositive = req.body.isPositive || review.isPositive;
              review.reviewedUserId = req.params.userId || review.reviewedUserId;
              review.reviewingUserId = req.user.userId || review.reviewingUserId;
              res.status(200).send(review);
            })
            .catch((error) => res.status(400).json({message: 'error updating review'}));
        }
      })
      .catch((error) => res.status(400).json({ message: 'error finding review' }));
  }
});

// Delete user review at reviewId of user with userId
router.delete('/:userId?/user-reviews/:reviewId?', isAuthenticated, (req, res) => {
  if(!req.params.userId || !req.params.reviewId) {
    res.status(422).json({ message: 'no user or review provided' });
  } else {
    UserReview.findByPk(req.params.reviewId)
      .then(review => {
        if (!review) {
          res.status(400).json({ message: 'review not found' });
        } else if (review.reviewingUserId !== req.user.userId) {
          res.status(422).json({ message: 'user does not own review' });
        } else {
          return review
            .destroy()
            .then(() => res.status(204).json(''))
            .catch((error) => res.status(400).json(error));
        }
      })
      .catch((error) => res.status(400).json(error));
  }
});


/*---User Buy Order Routes---*/
// Get user's buy orders
router.get('/:userId?/buy-orders', (req, res) => {
  if(!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  } else {
    BuyOrder.findAll(
      {
        where: { PostingUserUserId: req.params.userId },
        include: [
          { model: Item,
            as: 'PostedItem'
          }
        ]
      })
      .then(orders => {
        if (orders === null) {
          res.status(404).json({error: 'orders not found'});
        }
        res.status(200).json({orders});
      })
      .catch(err => res.status(500).json({error: 'error searching for orders'}));
  }
});

// Create buy order of user
router.post('/:userId?/buy-orders', isAuthenticated, isSameUser, (req, res) => {
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

// Update buy order of user by order id
router.put('/:userId?/buy-orders/:buyOrderId?', isAuthenticated, isSameUser, (req, res) => {
  if(!req.params.buyOrderId) {
    res.status(422).json({ message: 'no order provided' });
  } else {
      BuyOrder.findByPk(req.params.buyOrderId)
        .then(order => {
          if (!order) {
            res.status(404).json({error: 'order not found'});
          }
          BuyOrder.update({
              PriceMin: req.body.priceMin || order.priceMin,
              PriceMax: req.body.priceMax || order.priceMax,
              OrderStatus: req.body.status || order.OrderStatus,
              Server: req.body.server || order.Server,
              DesiredEnhancement: req.body.enhancement || order.DesiredEnhancement,
              DesiredEnd: req.body.end || order.DesiredEnd,
              DesiredDex: req.body.dex || order.DesiredDex,
              DesiredInt: req.body.int || order.DesiredInt,
              DesiredStr: req.body.str || order.DesiredStr,
              DesiredSpr: req.body.spr || order.DesiredSpr,
              DesiredHp: req.body.hp || order.DesiredHp,
              DesiredSp: req.body.sp || order.DesiredSp,
              DesiredDmg: req.body.dmg || order.DesiredDmg,
              DesiredMdmg: req.body.mdmg || order.DesiredMdmg,
              DesiredDef: req.body.def || order.DesiredDef,
              DesiredMdef: req.body.mdef || order.DesiredMdef,
              DesiredAim: req.body.aim || order.DesiredAim,
              DesiredEva: req.body.eva || order.DesiredEva
            },
            { where: { BuyOrderId: req.params.buyOrderId } }
          )
            .then(() => {
              order.PriceMin = req.body.priceMin || order.priceMin;
              order.PriceMax = req.body.priceMax || order.priceMax;
              order.OrderStatus = req.body.status || order.OrderStatus;
              order.Server = req.body.server || order.Server;
              order.DesiredEnhancement = req.body.enhancement || order.DesiredEnhancement;
              order.DesiredEnd = req.body.end || order.DesiredEnd;
              order.DesiredDex = req.body.dex || order.DesiredDex;
              order.DesiredInt = req.body.int || order.DesiredInt;
              order.DesiredStr = req.body.str || order.DesiredStr;
              order.DesiredSpr = req.body.spr || order.DesiredSpr;
              order.DesiredHp = req.body.hp || order.DesiredHp;
              order.DesiredSp = req.body.sp || order.DesiredSp;
              order.DesiredDmg = req.body.dmg || order.DesiredDmg;
              order.DesiredMdmg = req.body.mdmg || order.DesiredMdmg;
              order.DesiredDef = req.body.def || order.DesiredDef;
              order.DesiredMdef = req.body.mdef || order.DesiredMdef;
              order.DesiredAim = req.body.aim || order.DesiredAim;
              order.DesiredEva = req.body.eva || order.DesiredEva;
              res.status(200).send(order);
            })
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    }
});


/*---User Sell Order Routes---*/
// Get user's sell orders
router.get('/:userId?/sell-orders', (req, res) => {
  if(!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  } else {
    SellOrder.findAll(
      {
        where: { PostingUserUserId: req.params.userId },
        include: [
          { model: Item,
            as: 'PostedItem'
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
        ]
      })
      .then(orders => {
        if (orders === null) {
          res.status(404).json({error: 'orders not found'});
        }
        res.status(200).json({orders});
      })
      .catch(err => res.status(500).json({error: 'error searching for orders'}));
  }
});

// Create sell order of user
router.post('/:userId?/sell-orders', isAuthenticated, isSameUser, (req, res) => {
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

// Update sell order of user by order id
router.put('/:userId?/sell-orders/:sellOrderId?', isAuthenticated, isSameUser, (req, res) => {
  if(!req.params.sellOrderId) {
    res.status(422).json({ message: 'no order provided' });
  } else {
    SellOrder.findByPk(req.params.sellOrderId)
      .then(order => {
        if (!order) {
          res.status(404).json({error: 'order not found'});
        }
        SellOrder.update({
            Price: req.body.price || order.Price,
            OpenToOffers: order.OpenToOffers,
            SaleStatus: req.body.status || order.SaleStatus,
            Server: req.body.server || order.Server,
            Enhancement: req.body.enhancement || order.Enhancement,
            End: req.body.end || order.End,
            Dex: req.body.dex || order.Dex,
            Int: req.body.int || order.Int,
            Str: req.body.str || order.Str,
            Spr: req.body.spr || order.Spr,
            Hp: req.body.hp || order.Hp,
            Sp: req.body.sp || order.Sp,
            Dmg: req.body.dmg || order.Dmg,
            Mdmg: req.body.mdmg || order.Mdmg,
            Def: req.body.def || order.Def,
            Mdef: req.body.mdef || order.Mdef,
            Aim: req.body.aim || order.Aim,
            Eva: req.body.eva || order.Eva
          },
          { where: { SellOrderId: req.params.sellOrderId } }
        )
          .then(() => {
            order.Price = req.body.price || order.Price;
            order.SaleStatus = req.body.status || order.SaleStatus;
            order.Server = req.body.server || order.Server;
            order.Enhancement = req.body.enhancement || order.Enhancement;
            order.End = req.body.end || order.End;
            order.Dex = req.body.dex || order.Dex;
            order.Int = req.body.int || order.Int;
            order.Str = req.body.str || order.Str;
            order.Spr = req.body.spr || order.Spr;
            order.Hp = req.body.hp || order.Hp;
            order.Sp = req.body.sp || order.Sp;
            order.Dmg = req.body.dmg || order.Dmg;
            order.Mdmg = req.body.mdmg || order.Mdmg;
            order.Def = req.body.def || order.Def;
            order.Mdef = req.body.mdef || order.Mdef;
            order.Aim = req.body.aim || order.Aim;
            order.Eva = req.body.eva || order.Eva;
            res.status(200).send(order);
          })
          .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(400).json(error));
  }
});


/*---User Item Offer Routes---*/
// Get offers made by user
router.get('/:userId?/item-offers', isAuthenticated, isSameUser, (req, res) => {
  if(!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  } else {
    ItemOffer.findAll(
      {
        where: { OfferingUserUserId: req.params.userId },
        include: [
          { model: SellOrder,
            as: 'SellOrder',
            include: [{
                model: Item,
                as: 'PostedItem',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              }]
          }
        ]
      })
      .then(offers => {
        if (offers === null) {
          res.status(404).json({error: 'offers not found'});
        }
        res.status(200).json({offers});
      })
      .catch(err => res.status(500).json({error: 'error searching for reviews'}));
  }
});

// Delete offer made by user with userId
router.delete('/:userId?/item-offers/:offerId?', isAuthenticated, isSameUser, (req, res) => {
  if(!req.params.offerId) {
    res.status(422).json({ message: 'no offer provided' });
  } else {
    ItemOffer.findByPk(req.params.offerId)
      .then(offer => {
        if (!offer) {
          return res.status(400).json({
            message: 'offer not found',
          });
        }
        return offer
          .destroy()
          .then(() => res.status(204).json())
          .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(400).json(error));
  }
});

module.exports = router;