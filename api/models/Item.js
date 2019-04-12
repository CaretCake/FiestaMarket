const Sequelize = require('sequelize');
const db = require('../config/database');


const Item = db.define('Items', {
  ItemId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Type: {
    type: Sequelize.ENUM('earrings', 'necklace', 'ring', 'top', 'chest', 'pants', 'boots', 'bracelet', 'mace', 'hammer', '1-hand sword', '2-hand sword', 'axe', 'bow', 'crossbow', 'staff', 'wand', 'dual claws', 'dual swords', 'blade'),
    allowNull: false
  },
  Class: {
    type: Sequelize.ENUM('fighter', 'knight', 'gladiator', 'cleric', 'holy knight', 'guardian', 'mage', 'wizard', 'warlock', 'archer', 'ranger', 'sharpshooter', 'trickster', 'reaper', 'spectre', 'crusader', 'templar'),
    allowNull: false
  },
  Level: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  TwoSetEffect: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  ThreeSetEffect: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  FourSetEffect: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  FiveSetEffect: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  StatType: {
    type: Sequelize.ENUM('normal', 'prestige'),
    allowNull: false
  }
});


module.exports = Item;