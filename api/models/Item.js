module.exports = (sequelize, type) => {
  return sequelize.define('Items', {
    ItemId: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    ItemName: {
      type: type.STRING(45),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true,
        is: /^.[a-zA-Z0-9_'()]+$/
      }
    },
    ItemRarity: {
      type: type.ENUM('white', 'green', 'blue', 'setblue', 'yellow', 'orange', 'pink'),
      allowNull: false
    },
    Type: {
      type: type.ENUM('earrings', 'necklace', 'ring', 'head', 'chest', 'pants', 'boots', 'bracelet', 'mace', 'hammer', 'shield', '1-hand sword', '2-hand sword', 'axe', 'bow', 'crossbow', 'staff', 'wand', 'dual claws', 'dual swords', 'blade'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [['earrings', 'necklace', 'ring', 'head', 'chest', 'pants', 'boots', 'bracelet', 'mace', 'hammer', 'shield', '1-hand sword', '2-hand sword', 'axe', 'bow', 'crossbow', 'staff', 'wand', 'dual claws', 'dual swords', 'blade']]
      }
    },
    Class: {
      type: type.ENUM('fighter', 'knight', 'gladiator', 'cleric', 'holy knight', 'guardian', 'mage', 'wizard', 'warlock', 'archer', 'ranger', 'sharpshooter', 'trickster', 'reaper', 'spectre', 'crusader', 'templar', 'fighter and cleric', 'guardian and holyknight', 'all'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [['fighter', 'knight', 'gladiator', 'cleric', 'holy knight', 'guardian', 'mage', 'wizard', 'warlock', 'archer', 'ranger', 'sharpshooter', 'trickster', 'reaper', 'spectre', 'crusader', 'templar', 'fighter and cleric', 'guardian and holyknight', 'all']]
      }
    },
    Level: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    TwoSetEffect: {
      type: type.STRING(300),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true
      }
    },
    ThreeSetEffect: {
      type: type.STRING(300),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true
      }
    },
    FourSetEffect: {
      type: type.STRING(300),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true
      }
    },
    FiveSetEffect: {
      type: type.STRING(300),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true
      }
    },
    StatType: {
      type: type.ENUM('normal', 'prestige'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true,
        isIn: [['normal', 'prestige']]
      }
    }
  })
}