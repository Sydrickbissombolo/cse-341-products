const { body, validationResult } = require('express-validator');

// Validation rules for creating/updating a product
const validateProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation rules for creating/updating a country
const validateCountries = [
    body('name').notEmpty().withMessage('Name is required'),
    body('capital').notEmpty().withMessage('Capital is required'),
    body('population').isFloat({ gt: 0 }).withMessage('Population must be a number greater than 0'),
    body('continent').notEmpty().withMessage('Continent is required'),
    body('createdAt').isISO8601().withMessage('CreatedAt must be a valid date in ISO 8601 format'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateProduct, validateCountries };
