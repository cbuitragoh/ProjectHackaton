var express = require('express');
var router = express.Router();

var jsonParser = express.json();
var mailController = require('./mail.controller');
// var tokenController = require('./token.controller');

router.post('/', jsonParser, mailController.sendMail);
/* 
router.get('/validate', jsonParser, tokenController.validate);
router.get('/forget-password', jsonParser, tokenController.getTemporaryToken);
router.put('/reset-password', jsonParser, authController.changePassword); */


module.exports = router;