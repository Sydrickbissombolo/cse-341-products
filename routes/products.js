const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const { validateProduct } = require('../middleware/validation');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;