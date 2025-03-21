const router = require('express').Router();
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all products
const getAll = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const result = await mongodb.getDatabase().db().collection('products').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
};

// GET single product by ID
const getSingle = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const product = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format or server error.", error: error.message });
    }
};

// CREATE a new product
const createProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
        };

        const response = await mongodb.getDatabase().db().collection('products').insertOne(product);

        if (response.acknowledged) {
            return res.status(201).json({ message: "Product created successfully.", product });
        } else {
            return res.status(500).json({ message: "Failed to create product." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// UPDATE a product
const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
        };

        const response = await mongodb.getDatabase().db().collection('products').updateOne(
            { _id: productId },
            { $set: product }
        );

        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: "Product updated successfully." });
        } else {
            return res.status(404).json({ message: "No changes made or product not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update product.", error: error.message });
    }
};

// DELETE a product
const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = new ObjectId(req.params.id);

        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: "Product deleted successfully." });
        } else {
            return res.status(404).json({ message: "Product not found or already deleted." });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product.", error: error.message });
    }
};

module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct };
