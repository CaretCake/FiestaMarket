const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

//We will need the models folder to check passport against
const { User } = require('../config/database');

// Telling passport we want to use a Local Strategy
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    // When a user tries to sign in this code runs
    User.findOne({
      raw: true,
      where: { email: username.toLowerCase() }
    }).then(function(dbUser) {
      // If there's no user with the given username
      if (!dbUser) {
        //console.log('login failed for user ' + username.toLowerCase());
        return done(null, false, {
          message: "Incorrect username or password."
        });
      }
      // If there is a user with the given username, but the password is incorrect
      else {
        bcrypt.compare(password, dbUser.pass, function (err, result) {
          if (result === true) {
            //console.log('login success for user ' + username.toLowerCase());
            // If none of the above, return the user
            return done(null, dbUser);
          } else {
            //console.log('login failed for user ' + username.toLowerCase());
            return done(null, false, {
              message: "Incorrect username or password."
            });
          }
        });
      }

    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, done) {
  console.log('serializeUser called on: ' + JSON.stringify(user));
  done(null, user.userId);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser called on: ' + id);

  User.findByPk(id)
    .then(user => {
      //console.log('deserialize ' + user);
      done(null, user);
    })
    .catch(err => {}/*console.log('error deserialize user')*/);
});

module.exports = passport;