const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../config/database');

passport.use('local', new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      raw: true,
      where: { email: username.toLowerCase() }
    }).then(function(dbUser) {
        if (!dbUser) { // there's no user with the given username
          return done(null, false, {
          message: "Incorrect username or password."
        });
      }
      else {
        bcrypt.compare(password, dbUser.pass, function (err, result) {
          if (result === true) { // matched, return the user
            return done(null, dbUser);
          } else {
            return done(null, false, { // there is a user with the given username, but the password is incorrect
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