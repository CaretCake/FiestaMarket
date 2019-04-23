const express = require('express');
const router = express.Router();
const { UserReview } = require('../config/database');

//Add a user review
router.get('/add', (req, res) => {
  const data = {
    ReviewText: 'TestUser4',
    reviewedUserId: 'email4@me.com',
    reviewingUserId: 'password'
  };

  let { ReviewText, reviewedUserId, reviewingUserId } = data;

  UserReview.create({
    ReviewText,
    reviewedUserId,
    reviewingUserId
  })
    .then(userReview => res.redirect('/'))
    .catch(err => {});
});


module.exports = router;