const router = require('express').Router();
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


// GET all countries
const getAllCountries = async (req, res) => {
    //#swagger.tags=['Countries']
    try {
        const result = await mongodb.getDatabase().db().collection('countries').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving countries", error: error.message });
    }
};

// GET a single country by ID
const getSingleCountry = async (req, res) => {
    //#swagger.tags=['Countries']
    try {
        const countryId = new ObjectId(req.params.id);
        const country = await mongodb.getDatabase().db().collection('countries').findOne({ _id: countryId });

        if (!country) {
            return res.status(404).json({ message: "Country not found." });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format or server error.", error: error.message });
    }
};

// CREATE a new country
const createCountry = async (req, res) => {
    //#swagger.tags=['Countries']
    try {
        const country = {
            name: req.body.name,
            capital: req.body.capital,
            population: req.body.population,
            continent: req.body.continent,
            createdAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('countries').insertOne(country);

        if (response.acknowledged) {
            return res.status(201).json({ message: "Country created successfully.", country });
        } else {
            return res.status(500).json({ message: "Failed to create country." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// UPDATE a country
const updateCountry = async (req, res) => {
    //#swagger.tags=['Countries']
    try {
        const countryId = new ObjectId(req.params.id);
        const country = {
            name: req.body.name,
            capital: req.body.capital,
            population: req.body.population,
            continent: req.body.continent,
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('countries').updateOne(
            { _id: countryId },
            { $set: country }
        );

        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: "Country updated successfully." });
        } else {
            return res.status(404).json({ message: "No changes made or country not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update country.", error: error.message });
    }
};

// DELETE a country
const deleteCountry = async (req, res) => {
    //#swagger.tags=['Countries']
    try {
        const countryId = new ObjectId(req.params.id);

        const response = await mongodb.getDatabase().db().collection('countries').deleteOne({ _id: countryId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: "Country deleted successfully." });
        } else {
            return res.status(404).json({ message: "Country not found or already deleted." });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete country.", error: error.message });
    }
};

module.exports = { getAllCountries, getSingleCountry, createCountry, updateCountry, deleteCountry };