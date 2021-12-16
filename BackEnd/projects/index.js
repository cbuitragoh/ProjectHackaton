var express = require('express');
var router = express.Router();

var jsonParser = express.json();
var projectController = require('./project.controller');
// var tokenController = require('./token.controller');

router.post('/', jsonParser, projectController.register);
router.get('/talent/:talent', jsonParser, projectController.getProjectsByTalent);
router.get('/:id', jsonParser, projectController.getProjects);
router.delete('/:id', jsonParser, projectController.deleteProjects);
/* 
router.get('/validate', jsonParser, tokenController.validate);
router.get('/forget-password', jsonParser, tokenController.getTemporaryToken);
router.put('/reset-password', jsonParser, authController.changePassword); */


module.exports = router;