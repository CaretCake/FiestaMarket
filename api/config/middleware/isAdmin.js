const { User } = require('../database');

// This is middleware for restricting routes a user is not allowed to visit if not an admin
module.exports = function(req, res, next) {
  //console.log('checking role of ' + JSON.stringify(req.user));

  User.findOne(
    { where: { userId: req.user.userId },
      attributes: { exclude: ['pass'] }
    })
    .then(user => {
      if (user === null) {
        //console.log('no user!');
        res.status(404).send({ error: 'user does not exist' });
      } else if (user.role !== 'admin') {
        //console.log('user is not admin');
        res.status(403).send({ error: 'user does not have privileges' });
      } else {
        next();
      }
    })
    .catch(err => { return next(err); });
};