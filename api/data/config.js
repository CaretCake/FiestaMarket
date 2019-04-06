const mysql = require('mysql');

// Set database connection credentials
const config = {
  host     : 'ls-b06b26de74c4aac85f292fdb2330847cf1f525d0.cmzli6sne7su.us-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'dbmasteruser',
  password : ',h$<K7NRZ39:4]:D<81jer6Wq8NU<i-3',
  database : 'fiestadb'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;