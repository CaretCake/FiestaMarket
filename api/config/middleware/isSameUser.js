/* This is middleware for checking that the userId passed by the user matches their id,
   from editing/accessing other user's information. */
module.exports = function(req, res, next) {
  if (!req.params.userId) {
    res.status(422).json({ message: 'no user provided' });
  } else if (parseInt(req.user.userId) !== parseInt(req.params.userId)) {
    res.status(409).json({ error: 'user ids do not match' });
  } else {
    return next();
  }
};