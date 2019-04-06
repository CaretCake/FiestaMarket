var express = require('express');
var router = express.Router();

const pool = require('../data/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM Users', (error, result) => {
    if (error) throw error;

    res.send(result);
  });
});

module.exports = router;
