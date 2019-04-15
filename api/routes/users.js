var express = require('express');
var router = express.Router();
const { User } = require('../config/database');
const { Alias } = require('../config/database');

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
router.get('/:userId?/', (req, res) => {});

//Get user's written reviews
router.get('/', (req, res) => {});

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