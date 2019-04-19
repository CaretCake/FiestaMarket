module.exports = (sequelize, type) => {
  return sequelize.define('Aliases', {
    AliasName: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 20,
        notNull: true,
        notEmpty: true,
        is: /^.[a-zA-Z0-9_]+$/
      }
    },
    Type: {
      type: type.ENUM('discord', 'in-game'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [['discord', 'in-game']]
      }
    },
    Server: {
      type: type.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
      validate: {
        isIn: [['Isya', 'Pagel', 'Jenira', 'Enid']]
      }
    },
    Preferred: {
      type: type.BOOLEAN,
      allowNull: false
    }
  })
}