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
        len: {
          args: [5, 16],
          msg: 'Username must be between 5 and 16 characters'
        },
        notNull: true,
        notEmpty: true,
        is: {
          args: /^.[a-zA-Z0-9_]+$/,
          msg: 'Username must be only alphanumeric'
        }
      }
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email must be a valid email'
        },
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
        len: {
          args: [6, 200],
          msg: 'Password must be between 6 and 200 characters'
        }
      }
    },
    role: {
      type: type.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: {
          args: [['user', 'admin']],
          msg: 'Role must be either user or admin'
        }
      }
    },
    status: {
      type: type.ENUM('online', 'in-game', 'offline'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: {
          args: [['online', 'in-game', 'offline']],
          msg: 'Status must be either online, in-game, or offline'
        }
      }
    }
  })
}