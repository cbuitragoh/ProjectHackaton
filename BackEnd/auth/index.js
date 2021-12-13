var express = require('express');
var router = express.Router();

var jsonParser = express.json();
var authController = require('./auth.controller');
// var tokenController = require('./token.controller');

router.post('/', jsonParser, authController.login);/* 
router.get('/validate', jsonParser, tokenController.validate);
router.get('/forget-password', jsonParser, tokenController.getTemporaryToken);
router.put('/reset-password', jsonParser, authController.changePassword); */


module.exports = router;