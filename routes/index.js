var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../FrontEnd/login', 'login.html'));
})

router.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../FrontEnd/register/register-home', 'register-home.html'));
})

router.get('/register/gestor', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../FrontEnd/register/register-gestor', 'register-gestor.html'));
})

router.get('/register/talentoso', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../FrontEnd/register/register-talentoso', 'register-talentoso.html'));
})

router.get('/home/gestor', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../FrontEnd/home/home-gestor', 'home-gestor.html'));
})

router.get('/home/talentoso', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../FrontEnd/home/home-talentoso', 'home-talentoso.html'));
})

module.exports = router;
