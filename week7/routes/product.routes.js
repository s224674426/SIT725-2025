const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/product.controller');

router.get('/api/products', ctrl.list);
router.get('/api/products/:id', ctrl.getById);
router.post('/api/products', ctrl.create);

module.exports = router;
