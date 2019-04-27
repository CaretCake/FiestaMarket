const { User } = require('../database');

/* This is middleware for checking that the userId passed by the user matches their id,
   from editing/accessing other user's information. */
module.exports = function(req, res, next) {
  if (!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  } else {
    User.findOne(
      { where: { userId: req.user.userId },
        attributes: { exclude: ['pass'] }
      })
      .then(user => {
        if (user === null) { // User not found
          res.status(404).json({ error: 'user not found' });
        } else if (user.role !== 'admin') { // User not an admin
          if (parseInt(req.user.userId) === parseInt(req.params.userId)) {
            return next();
          } else { // User not an admin and attempting to edit something owned by another user
            res.status(403).json({ error: 'user ids do not match' });
          }
        } else { // User found and is admin
          return next();
        }
      })
      .catch(err => { console.log(err); });
  }

};