var express = require('express');
var router = express.Router();
const { Item } = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get item list
router.get('/', (req, res) =>
  Item.findAll()
    .then(items => {
      console.log(items);
      res.sendStatus(200);
    })
    .catch(err => console.log(err)));


//Search for items
router.get('/search', (req, res) => {
  const term  = req.query.term;
  Item.findAll({
    where: { ItemName: { [Op.like]: '%' + term + '%' } },
    order: [
      ['ItemName', 'ASC']
    ]})
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

//Get item by id
router.get('/:itemId?', (req, res) => {
  let query;
  if(req.params.itemId) {
    query = Item.findAll(
      { where: { itemId: req.params.itemId }})
  } else {
    query = Item.findAll({ include: [ Item ]})
  }
  return query.then(items => res.json(items))
});

module.exports = router;