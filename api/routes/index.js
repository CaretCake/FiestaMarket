var express = require('express');
var router = express.Router();
const sequelize = require('../config/database');


/* GET home page. */
router.get('/', function(req, res, next) {

  Object.keys(sequelize.models).forEach(function(modelName) {
    if ("associate" in sequelize.models[modelName]) {
      sequelize.models[modelName].associate();
    }
  });

  sequelize.sync();

  sequelize.query("SELECT * FROM Users").then(myTableRows => {
    console.log(myTableRows)
  })

  res.render('index', { title: 'Fiesta Market API' });
});

module.exports = router;
