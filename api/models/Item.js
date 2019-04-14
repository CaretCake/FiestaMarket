module.exports = (sequelize, type) => {
  return sequelize.define('Items', {
    ItemId: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    ItemName: {
      type: type.STRING(45),
      allowNull: false,
      unique: true
    },
    Type: {
      type: type.ENUM('earrings', 'necklace', 'ring', 'top', 'chest', 'pants', 'boots', 'bracelet', 'mace', 'hammer', '1-hand sword', '2-hand sword', 'axe', 'bow', 'crossbow', 'staff', 'wand', 'dual claws', 'dual swords', 'blade'),
      allowNull: false
    },
    Class: {
      type: type.ENUM('fighter', 'knight', 'gladiator', 'cleric', 'holy knight', 'guardian', 'mage', 'wizard', 'warlock', 'archer', 'ranger', 'sharpshooter', 'trickster', 'reaper', 'spectre', 'crusader', 'templar', 'all'),
      allowNull: false
    },
    Level: {
      type: type.INTEGER,
      allowNull: false
    },
    TwoSetEffect: {
      type: type.STRING(300),
      allowNull: false
    },
    ThreeSetEffect: {
      type: type.STRING(300),
      allowNull: false
    },
    FourSetEffect: {
      type: type.STRING(300),
      allowNull: false
    },
    FiveSetEffect: {
      type: type.STRING(300),
      allowNull: false
    },
    StatType: {
      type: type.ENUM('normal', 'prestige'),
      allowNull: false
    }
  })
}