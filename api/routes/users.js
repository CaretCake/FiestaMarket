var express = require('express');
var router = express.Router();
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
router.get('/add', (req, res) => {
  const data = {
    userName: 'TestUser4',
    email: 'email4@me.com',
    pass: 'password',
    salt: '23456',
    status: 'in-game'
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
    .catch(err => console.log(err));
});


//Get user's aliases
router.get('/:userId?/aliases', (req, res) => {
  User.findAll({
    attributes: { exclude: ['pass', 'salt', 'status', 'createdAt', 'updatedAt'] },
    where: { userId: req.params.userId },
    include: [ { model: Alias, as: 'Aliases' } ] })
    .then(user => res.json(user));
});

//Get user's received reviews
router.get('/:userId?/receivedreviews', (req, res) => {
  User.findAll({
    attributes: { exclude: ['pass', 'salt', 'status', 'createdAt', 'updatedAt'] },
    where: { userId: req.params.userId },
    include: [ { model: UserReview, as: 'ReceivedReviews' } ] })
    .then(user => res.json(user));
});

//Get user's written reviews
router.get('/:userId?/writtenreviews', (req, res) => {
  User.findAll({
    attributes: { exclude: ['pass', 'salt', 'status', 'createdAt', 'updatedAt'] },
    where: { userId: req.params.userId },
    include: [ { model: UserReview, as: 'WrittenReviews' } ] })
    .then(user => res.json(user));
});

//Get user's sell orders
router.get('/:userId?/sellorders', (req, res) => {
  User.findAll({
    attributes: { exclude: ['pass', 'salt', 'status', 'createdAt', 'updatedAt'] },
    where: { userId: req.params.userId },
    include: [ { model: SellOrder, as: 'SellOrders' } ] })
    .then(user => res.json(user));
});

//Get user's buy orders
router.get('/:userId?/buyorders', (req, res) => {
  User.findAll({
    attributes: { exclude: ['pass', 'salt', 'status', 'createdAt', 'updatedAt'] },
    where: { userId: req.params.userId },
    include: [ { model: BuyOrder, as: 'BuyOrders' } ] })
    .then(user => res.json(user));
});

//Get user's item offers
router.get('/:userId?/itemoffers', (req, res) => {
  User.findAll({
    attributes: { exclude: ['pass', 'salt', 'status', 'createdAt', 'updatedAt'] },
    where: { userId: req.params.userId },
    include: [ { model: ItemOffer, as: 'Offers' } ] })
    .then(user => res.json(user));
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