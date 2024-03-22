const express = require('express');
const router = express.Router();
const Joi = require('joi');
const productService = require('./product.service');


// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

async function getAll(req, res, next) {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const product = await productService.getById(req.params.id);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        // Call the create function from the service
        await productService.create(req.body);
        res.json({ message: 'Product created' });
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        // Call the update function from the service
        await productService.update(req.params.id, req.body);
        res.json({ message: 'Product updated' });
    } catch (error) {
        next(error);
    }
}

async function _delete(req, res, next) {
    try {
        // Call the delete function from the service
        await productService.delete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
}
