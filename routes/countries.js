const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');
const { validateCountries } = require('../middleware/validation');



// Define routes for countries
router.get('/', countriesController.getAllCountries);

router.get('/:id', countriesController.getSingleCountry);

router.post('/', validateCountries, countriesController.createCountry);

router.put('/:id', validateCountries, countriesController.updateCountry);

router.delete('/:id', countriesController.deleteCountry);

module.exports = router;
