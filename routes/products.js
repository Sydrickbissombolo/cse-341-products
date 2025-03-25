const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const { validateProduct } = require('../middleware/validation');

const { isAuthenticated } = require('../middleware/authenticate');



router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/', isAuthenticated, validateProduct, productsController.createProduct);

router.put('/:id', isAuthenticated, validateProduct, productsController.updateProduct);

router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;