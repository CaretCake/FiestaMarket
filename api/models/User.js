module.exports = (sequelize, type) => {
  return sequelize.define('Users', {
    userId: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    userName: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    pass: {
      type: type.STRING,
      allowNull: false
    },
    status: {
      type: type.ENUM('online', 'in-game', 'offline'),
      allowNull: false
    }
  })
}