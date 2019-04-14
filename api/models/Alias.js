module.exports = (sequelize, type) => {
  return sequelize.define('Aliases', {
    AliasName: {
      type: type.STRING,
      allowNull: false
    },
    Type: {
      type: type.ENUM('discord', 'in-game'),
      allowNull: false
    },
    Server: {
      type: type.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
    },
    Preferred: {
      type: type.BOOLEAN,
      allowNull: false
    }
  })
}