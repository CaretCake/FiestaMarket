const Sequelize = require('sequelize');

module.exports = new Sequelize('fiestadb', 'dbmasteruser', ',h$<K7NRZ39:4]:D<81jer6Wq8NU<i-3', {
  host      : 'ls-b06b26de74c4aac85f292fdb2330847cf1f525d0.cmzli6sne7su.us-east-1.rds.amazonaws.com',
  port      : '3306',
  dialect   : 'mysql',
  pool      : {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
});