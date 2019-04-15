var express = require('express');
var router = express.Router();
const { Alias } = require('../config/database');

//Add a alias
router.get('/add', (req, res) => {
  const data = {
    AliasName: 'TestUser4',
    Type: 'email4@me.com',
    Server: 'password',
    Preferred: '23456',
    UserUserId: 'in-game'
  }

  let { AliasName, Type, Server, Preferred, UserUserId } = data;

  Alias.create({
    AliasName,
    Type,
    Server,
    Preferred,
    UserUserId
  })
    .then(alias => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router;