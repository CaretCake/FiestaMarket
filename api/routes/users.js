const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 15;
const passport = require('../config/passport');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isAdmin = require('../config/middleware/isAdmin');
const setUserStatus = require('../helpers/setUserStatus');
const { Alias, BuyOrder, Item, ItemOffer, SellOrder, User, UserReview } = require('../config/database');

//Get user list
router.get('', isAuthenticated, isAdmin, (req, res) => {
  User.findAll(
    { attributes: { exclude: ['pass'] }
    })
    .then(users => {
      res.status(200).json(users);;
    })
    .catch(err => console.log(err));
});

//Add a user
router.post('/add', (req, res) => {
  bcrypt.hash(req.body.pass, saltRounds, function (err, hash){
    User.create({
      userName: req.body.username,
      email: req.body.email.toLowerCase(),
      pass: hash,
      status: 'offline'
    })
    .then(function(data) {
      if (data) {
        return res.status(201).json(data);
      }
    })
    .catch(function (error) {
      if (error.errors) { // is SequelizeValidationError
        res.status(422).json({ message: error.errors[0].message, field: error.errors[0].path.toLowerCase() });
      } else {
        res.status(400).json({ message: error });
      }
    });
  });
});

//Sign in user
router.post('/login', function(req,res,next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        console.log("Error: " + err);
        return next(err);
      }
      if (!user) {
        return res.status(401).json({message: info.message, user });
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log('logged in user: ' + JSON.stringify(user));

        // Set user status to online
        setUserStatus('online', user.userId);
        user.status = 'online';

        delete user.pass;
        delete user.createdAt;
        delete user.updatedAt;
        return res.status(200).json({message: 'success', user });
      });
    })(req,res,next);
  }
);

//Sign out user
router.post("/logout", function(req, res) {
  // Set user status to offline
  setUserStatus('offline', req.body.userId);

  // Handle passport session logout and clear sid
  req.logout();
  req.session.destroy((err) => {
    res.status(204).clearCookie('connect.sid').json('Logged out');
  });
});

//Get user by id
router.get('/:userId?', (req, res) => {
  if(req.params.userId) {
    User.findOne(
      { where: { userId: req.params.userId },
        attributes: { exclude: ['pass', 'email'] },
        include: [
          { model: Alias,
            as: 'Aliases',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          { model: BuyOrder,
            as: 'BuyOrders',
            attributes: { exclude: ['createdAt'] },
            include: [
              {
                model: Item,
                as: 'PostedItem',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              }]
          },
          { model: SellOrder,
            as: 'SellOrders',
            attributes: { exclude: ['createdAt'] },
            include: [
              {
                model: Item,
                as: 'PostedItem',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              },
              {
                model: ItemOffer,
                as: 'Offers',
                attributes: { exclude: ['updatedAt'] }
              }]
          },
          {
            model: ItemOffer,
            as: 'Offers',
            attributes: { exclude: ['updatedAt'] },
            include: [
              {
                model: SellOrder,
                as: 'SellOrder',
                attributes: { exclude: ['createdAt'] },
                include: [
                  {
                    model: Item,
                    as: 'PostedItem',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                  },
                  {
                    model: User,
                    as: 'PostingUser',
                    attributes: { exclude: ['pass', 'email'] },
                    include: [
                      { model: Alias,
                        as: 'Aliases',
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                      }]
                  }]
              }]
          }
        ],
        order: [
          [ { model: Alias, as: 'Aliases' }, 'Preferred', 'DESC'],
          [ { model: SellOrder, as: 'SellOrders' }, 'updatedAt', 'DESC'],
          [ { model: BuyOrder, as: 'BuyOrders' }, 'updatedAt', 'DESC']
        ]
      })
      .then(user => {
        if (user === null) {
          res.status(404);
        }
        res.status(200).json({ user });
      })
      .catch(err => res.status(500).send({ error: "error searching for user" }));
  } else {
    res.status(400).send({ error: 'no user provided' });
  }
});

// Update user
router.put('/:userId?/update', isAuthenticated, (req, res) => {
  if (parseInt(req.user.userId) !== parseInt(req.params.userId)) {
    res.status(409).json({ error: "user ids do not match" });
  } else {
    User.findByPk(req.user.userId,
      {
        attributes: { exclude: ['pass', 'email', 'createdAt', 'updatedAt'] }
      }).then(user => {
      if (!user) {
        res.status(404).json({error: "issue finding user after update"});
      }
      User.update(
          {
            status: req.body.status || user.status,
            userName: req.body.username || user.userName
          },
          { where: { userId: req.user.userId } }
        )
        .then(() => {
          user.userName = req.body.username || user.userName;
          user.status = req.body.status || user.status;
          res.status(200).send(user);
        })
        .catch((error) => res.status(400).send(error));
    })
      .catch((error) => res.status(400).send(error));
  }
});


module.exports = router;