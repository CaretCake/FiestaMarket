const { User } = require('../database');

// This is middleware for restricting routes a user is not allowed to visit if not an admin
module.exports = function(req, res, next) {

  User.findOne(
    { where: { userId: req.user.userId },
      attributes: { exclude: ['pass'] }
    })
    .then(user => {
      if (user === null) { // User not found
        res.status(404).json({ error: 'user not found' });
      } else if (user.role !== 'admin') { // User not an admin
        res.status(403).json({ error: 'unauthorized user' });
      } else { // User found and is admin
        return next();
      }
    })
    .catch(err => { return next(err); });
};