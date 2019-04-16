var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//We will need the models folder to check passport against
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "username"
  },
  function(uname, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      raw: true,
      where: { username: uname.toLowerCase() }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username or password."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else {
        bcrypt.compare(req.body.pass, user.pass, function (err, result) {
          if (result == true) {
            console.log('login success for user ' + req.body.username.toLowerCase());
            res.redirect('/home');
          } else {
            console.log('login failed for user ' + req.body.username.toLowerCase());
            res.send('Incorrect password');
          }
        })
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;