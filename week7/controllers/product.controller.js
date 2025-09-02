const Product = require('../models/product.model');

exports.list = async (_req, res, next) => {
  try { res.json(await Product.findAll()); }
  catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const row = await Product.findById(Number(req.params.id));
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const saved = await Product.create(req.body);
    req.app.get('io').emit('product:created', saved);
    res.status(201).json(saved);
  } catch (e) { next(e); }
};
