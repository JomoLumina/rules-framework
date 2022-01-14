var messages = require('../utils/messages.json');
var validator = require('../public/javascripts/emailValidator.js')
var express = require('express');
var router = express.Router();


/* GET emails listing. */
router.get('/', function(req, res, next) {
  var results = validator.validateAllListedEmails();
  if(results){
    return res.json({emails: results})
  }
  return res.json({ message: messages.EMAILS_NOT_FOUND })
});

module.exports = router;
