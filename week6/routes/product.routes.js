const router = require('express').Router();
const ctl = require('../controllers/product.controller');

// /api/products
router.get('/', ctl.list);
router.get('/:id', ctl.getById);
router.post('/', ctl.create);
router.patch('/:id', ctl.update);
router.delete('/:id', ctl.remove);

module.exports = router;
