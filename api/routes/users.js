const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 15;
const passport = require("../config/passport");

const { User } = require('../config/database');
const { Alias } = require('../config/database');
const { UserReview } = require('../config/database');
const { BuyOrder } = require('../config/database');
const { SellOrder } = require('../config/database');
const { ItemOffer } = require('../config/database');

//Get user list
router.get('/', (req, res) => {
  User.findAll()
    .then(users => {
      console.log(users);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

//Add a user
router.post('/add', (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.pass, saltRounds, function (err, hash){
    User.create({
      userName: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      pass: hash,
      status: 'offline'
    }).then(function(data) {
      if (data) {
        res.redirect('/');
      }
    });
  });

  /*const data = {
    userName: 'TestUser4',
    email: 'email4@me.com',
    pass: 'password',
    salt: '23456',
    status: 'offline'
  }

  let { userName, email, pass, salt, status } = data;

  User.create({
    userName,
    email,
    pass,
    salt,
    status
  })
    .then(user => res.redirect('/users'))
    .catch(err => console.log(err));*/
});

//Sign in user
router.post('/login', function(req,res,next) {
    console.log("reached auth endpoint");
    console.log(req.body);
    passport.authenticate("local", function(err, user, info) {
      console.log("Test:" + user);
      if (err) {
        console.log("Error1" + err);
        return next(err);
      }
      if (!user) {
        console.log("Error2");
        return res.json(401, {
          error: 'Auth Error!'
        });
      }
      console.log("Error3");
      let userInfo = {
        username: user.username
      };
      res.json(userInfo);
    })(req,res,next);
  }
    /*User.findOne({
      raw: true,
      where: { username: req.body.username.toLowerCase() } })
      .then((function (user) {
        if (!user) {
          res.redirect('/');
        } else {
          bcrypt.compare(req.body.pass, user.pass, function (err, result) {
            if (result == true) {
              console.log('login success for user ' + req.body.username.toLowerCase());
              res.redirect('/home');
            } else {
              console.log('login failed for user ' + req.body.username.toLowerCase());
              res.send('Incorrect password');
            }
          })
        }
      }));*/
);


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
router.get('/:userId?', (req, res) => {
  let query;
  if(req.params.userId) {
    query = User.findAll(
      { where: { userId: req.params.userId }})
  } else {
    query = User.findAll({ include: [ User ]})
  }
  return query.then(users => res.json(users))
});

module.exports = router;