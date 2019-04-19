const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 15;
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

const { User } = require('../config/database');
const { Alias } = require('../config/database');
const { UserReview } = require('../config/database');
const { BuyOrder } = require('../config/database');
const { SellOrder } = require('../config/database');
const { ItemOffer } = require('../config/database');
const { Item } = require('../config/database');

//Add a user
router.post('/add', (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.pass, saltRounds, function (err, hash){
    User.create({
      userName: req.body.username,
      email: req.body.email.toLowerCase(),
      pass: hash,
      status: 'offline'
    }).then(function(data) {
      if (data) {
        res.redirect('/');
      }
    });
  });
});

//Sign in user
router.post('/login', function(req,res,next) {
    console.log("reached auth endpoint");
    console.log(req.body);
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        console.log("Error: " + err);
        return next(err);
      }
      if (!user) {
        console.log("No user");
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log('logged in user: ' + JSON.stringify(user));
        delete user.pass;
        delete user.createdAt;
        delete user.updatedAt;
        return res.json({message: 'success', user });;
      });
    })(req,res,next);
  }
);

//Sign out user
router.get("/logout", function(req, res) {
  console.log(req.sessionID);
  req.logout();
  req.session.destroy((err) => {
    res.status(200).clearCookie('connect.sid');
    // Don't redirect, just print text
    res.send('Logged out');
  });
});

//Get user's aliases
router.get('/:userId?/aliases', (req, res) => {
  Alias.findAll({
    where: { UserUserId: req.params.userId } })
    .then(alias => res.json(alias));
});

//Get user's received reviews
router.get('/:userId?/receivedreviews', (req, res) => {
  UserReview.findAll({
    where: { reviewedUserId: req.params.userId } })
    .then(userReview => res.json(userReview));
});

//Get user's written reviews
router.get('/:userId?/writtenreviews', (req, res) => {
  UserReview.findAll({
    where: { reviewingUserId: req.params.userId } })
    .then(userReview => res.json(userReview));
});

//Get user's sell orders
router.get('/:userId?/sellorders', (req, res) => {
  SellOrder.findAll({
    where: { PostingUserUserId: req.params.userId } })
    .then(sellOrder => res.json(sellOrder));
});

//Get user's buy orders
router.get('/:userId?/buyorders', (req, res) => {
  BuyOrder.findAll({
    where: { PostingUserUserId: req.params.userId } })
    .then(buyOrder => res.json(buyOrder));
});

//Get user's item offers
router.get('/:userId?/itemoffers', (req, res) => {
  ItemOffer.findAll({
    where: { OfferingUserUserId: req.params.userId } })
    .then(itemOffer => res.json(itemOffer));
});

//Get user by id
router.get('/:userId?', isAuthenticated, (req, res) => {
  console.log('made it here');
  if(req.query.userId) {
    User.findOne(
      { where: { userId: req.query.userId },
        attributes: { exclude: ['pass'] },
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
              }]
          }
        ],
        order: [
          [ { model: Alias, as: 'Aliases' }, 'Preferred', 'DESC'],
          [ { model: SellOrder, as: 'SellOrders' }, 'updatedAt', 'DESC'],
          [ { model: BuyOrder, as: 'BuyOrders' }, 'updatedAt', 'DESC']
        ]
      })
      .then(user => res.json(user))
      .catch(err => res.status(500).send({ error: "Error searching for user" }));
  }
});

//Get user list
router.get('/', (req, res) => {
  User.findAll(
    { attributes: { exclude: ['pass'] }
    })
    .then(users => {
      console.log(users);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

module.exports = router;