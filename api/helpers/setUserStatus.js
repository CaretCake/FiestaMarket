const { User } = require('../config/database');

module.exports = function(status, id) {
  console.log('id: ' + id);
  User.update(
    { status: status },
    { where:
        { userId: id }
    }
  ).then(function(rowsUpdated) {
    return rowsUpdated;
  });
};