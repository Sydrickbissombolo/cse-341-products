const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');
const { validateCountries } = require('../middleware/validation');

const { isAuthenticated } = require('../middleware/authenticate');



// Define routes for countries
router.get('/', countriesController.getAllCountries);

router.get('/:id', countriesController.getSingleCountry);

router.post('/', isAuthenticated, validateCountries, countriesController.createCountry);

router.put('/:id', isAuthenticated, validateCountries, countriesController.updateCountry);

router.delete('/:id', isAuthenticated, countriesController.deleteCountry);

module.exports = router;
