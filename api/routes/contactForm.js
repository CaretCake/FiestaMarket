const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isAdmin = require('../config/middleware/isAdmin');
const { ContactFormSubmission, User } = require('../config/database');

// Get contact form submission list
router.get('/', isAuthenticated, isAdmin, (req, res) => {
  ContactFormSubmission.findAll()
    .then(cFormSubmissions => {
      res.status(200).json(cFormSubmissions);;
    })
    .catch(err => res.status(500).json({ message: "Server error" }));
});

// Create a contact form submission
router.post('/', (req, res) => {
  ContactFormSubmission.create({
    reasonForMessage: req.body.reasonForMessage,
    email: req.body.email || null,
    message: req.body.message
  })
    .then(function(data) {
      if (data) {
        return res.status(201).json({ data });
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

// Delete a contact form submission
router.delete('/:formId', isAuthenticated, isAdmin, (req, res) => {
  ContactFormSubmission.findByPk(req.params.formId)
    .then(cFormSubmission => {
      if (!cFormSubmission) {
        return res.status(400).json({
          message: 'form submission not found',
        });
      }
      return cFormSubmission
        .destroy()
        .then(() => res.status(204).json())
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
});


module.exports = router;