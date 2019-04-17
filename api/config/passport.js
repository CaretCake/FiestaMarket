const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

//We will need the models folder to check passport against
const { User } = require('../config/database');

// Telling passport we want to use a Local Strategy. In other words,
// we want login with a username/email and password
passport.use('local', new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  function(username, password, done) {
    // When a user tries to sign in this code runs
    User.findOne({
      raw: true,
      where: { username: username.toLowerCase() }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        console.log('login failed for user ' + username.toLowerCase());
        return done(null, false, {
          message: "Incorrect username or username."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else {
        bcrypt.compare(password, dbUser.pass, function (err, result) {
          if (result == true) {
            console.log('login success for user ' + username.toLowerCase());
            // If none of the above, return the user
            return done(null, dbUser);
          } else {
            console.log('login failed for user ' + username.toLowerCase());
            return done(null, false, {
              message: "Incorrect username or password."
            });
          }
        })
      }

    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  console.log('serializeUser called');
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;