var express = require('express');
var router = express.Router();
const db = require('../config/database');
const User = require('../models/User');

//Get user list
router.get('/', (req, res) =>
  User.findAll({
    attributes: { exclude: ['Salt'] }
  })
    .then(users => {
      console.log(users);
      res.sendStatus(200);
    })
    .catch(err => console.log(err)));

//Add a gig
router.get('/add', (req, res) => {
  const data = {
    UserName: 'TestUser',
    Email: 'email@me.com',
    Pass: 'password',
    Salt: '234',
    Status: 'online'
  }

  let { username, email, pass, salt, status } = data;

  User.create({
    UserName,
    Email,
    Pass,
    Salt,
    Status
  })
    .then(user => res.redirect('/users'))
    .catch(err => console.log(err));
});

module.exports = router;