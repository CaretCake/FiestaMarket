module.exports = (sequelize, type) => {
  return sequelize.define('Users', {
    userId: {
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
    userName: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 5,
        max: 12,
        notNull: true,
        notEmpty: true,
        is: /^.[a-zA-Z0-9_]+$/
      }
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isLowercase: true,
        notNull: true,
        notEmpty: true
      }
    },
    pass: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        min: 6,
        max: 200
      }
    },
    role: {
      type: type.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [['user', 'admin']]
      }
    },
    status: {
      type: type.ENUM('online', 'in-game', 'offline'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [['online', 'in-game', 'offline']]
      }
    }
  })
}