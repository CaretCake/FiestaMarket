// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  console.log('checking authentication of ' + JSON.stringify(req.user));

  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }
  // If the user isn't' logged in, redirect them to the login page
  console.log('not logged in ' + req.user);
  res.status(401).send({ error: 'unauthorized user' });
};