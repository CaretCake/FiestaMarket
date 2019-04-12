const mysql = require('mysql');

// Set database connection credentials
const pool = mysql.createPool({
  host     : 'ls-b06b26de74c4aac85f292fdb2330847cf1f525d0.cmzli6sne7su.us-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'dbmasteruser',
  password : ',h$<K7NRZ39:4]:D<81jer6Wq8NU<i-3',
  database : 'fiestadb'
});

function executeQuery(sql, callback) {
  pool.getConnection((err,connection) => {
    if(err) {
      return callback(err, null);
    } else {
      if(connection) {
        connection.query(sql, function (error, results, fields) {
          connection.release();
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    }
  });
}

function query(sql, callback) {
  executeQuery(sql,function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data);
  });
}

module.exports = {
  query: query
}