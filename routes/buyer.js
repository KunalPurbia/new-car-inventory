var express = require('express');
var router = express.Router();
const buyerController = require('../controllers/buyerController');
const catalogueController = require('../controllers/catalogueController');

/////////////////////////////////////GET HOME PAGE
router.get('/', buyerController.getHomePage);

/////////////////////////////////////GET CATALOGUE PAGE
router.get('/catalogue', catalogueController.getCataloguePageBuyer)

module.exports = router;
