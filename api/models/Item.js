const Sequelize = require('sequelize');
const db = require('../config/database');


const Item = db.define('item', {
  itemId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('earrings', 'necklace', 'ring', 'top', 'chest', 'pants', 'boots', 'bracelet', 'mace', 'hammer', '1-hand sword', '2-hand sword', 'axe', 'bow', 'crossbow', 'staff', 'wand', 'dual claws', 'dual swords', 'blade'),
    allowNull: false
  },
  class: {
    type: Sequelize.ENUM('fighter', 'knight', 'gladiator', 'cleric', 'holy knight', 'guardian', 'mage', 'wizard', 'warlock', 'archer', 'ranger', 'sharpshooter', 'trickster', 'reaper', 'spectre', 'crusader', 'templar'),
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  twoSetEffect: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  threeSetEffect: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  fourSetEffect: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  fiveSetEffect: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  statType: {
    type: Sequelize.ENUM('normal', 'prestige'),
    allowNull: false
  }
});

module.exports = Item;