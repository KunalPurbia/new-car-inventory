var express = require('express');
var router = express.Router();
const sellerController = require('../controllers/sellerController');
const catalogueController = require('../controllers/catalogueController');

/////////////////////////////////////GET HOME PAGE
router.get('/', sellerController.getHomePage);

/////////////////////////////////////GET CATALOGUE PAGE
router.get('/catalogue', catalogueController.getCataloguePageSeller);

/////////////////////////////////////GET ADD CATALOGUE PAGE
router.get('/catalogue/add', catalogueController.getAddCataologue);

/////////////////////////////////////ADDING COMPANY IN CATALOGUE
router.post('/catalogue/add', catalogueController.postAddCataologue);

/////////////////////////////////////GETTING UPDATE FORM COMPANY IN CATALOGUE
router.get('/catalogue/update', catalogueController.getUpdateCatalogue);

/////////////////////////////////////UPDATING DATAIN CATALOGUE
router.post('/catalogue/update', catalogueController.updateCatalogue);

/////////////////////////////////////DELETING COMPANY FROM CATALOGUE
router.get('/catalogue/delete', catalogueController.deleteCatalogue);

module.exports = router;
