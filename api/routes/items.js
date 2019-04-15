var express = require('express');
var router = express.Router();
const { Item } = require('../config/database')

//Get item list
router.get('/', (req, res) =>
  Item.findAll()
    .then(items => {
      console.log(items);
      res.sendStatus(200);
    })
    .catch(err => console.log(err)));

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