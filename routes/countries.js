const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');

// Define routes for countries
router.get('/', countriesController.getAllCountries);
router.get('/:id', countriesController.getSingleCountry);
router.post('/', countriesController.createCountry);
router.put('/:id', countriesController.updateCountry);
router.delete('/:id', countriesController.deleteCountry);

module.exports = router;
