module.exports = (sequelize, type) => {
  return sequelize.define('Aliases', {
    AliasName: {
      type: type.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 40],
          msg: "Alias name must be between 2 and 40 characters"
        },
        notNull: true,
        notEmpty: true,
        is: {
          args: /^.[a-zA-Z0-9_.#]+$/,
          msg: "Alias name must be only alphanumeric"
        }
      }
    },
    Type: {
      type: type.ENUM('discord', 'in-game'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: {
          args: [['discord', 'in-game']],
          msg: "Alias must be of type discord or in-game"
        }
      }
    },
    Server: {
      type: type.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
      validate: {
        isIn: {
          args: [['Isya', 'Pagel', 'Jenira', 'Enid']],
          msg: "Server must be Isya, Pagel, Jenira, or Enid"
        }
      }
    },
    Preferred: {
      type: type.BOOLEAN,
      allowNull: false
    }
  })
}