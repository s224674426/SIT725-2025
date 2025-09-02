const Product = require('../models/product.model');

// Controller: validate input, call model, shape response.
// No SQL here, no routing here.
exports.list = async (req, res, next) => {
  try {
    const items = await Product.findAll();
    res.json(items);
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const item = await Product.findById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    res.json(item);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'name is required (string)' });
    }
    const numPrice = Number(price);
    if (Number.isNaN(numPrice) || numPrice < 0) {
      return res.status(400).json({ error: 'price must be a non-negative number' });
    }

    const created = await Product.create({ name, price: numPrice, description });
    res.status(201).json(created);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const patch = {};
    if (req.body.name !== undefined) {
      if (typeof req.body.name !== 'string' || !req.body.name.trim()) {
        return res.status(400).json({ error: 'name must be a non-empty string' });
      }
      patch.name = req.body.name;
    }
    if (req.body.price !== undefined) {
      const numPrice = Number(req.body.price);
      if (Number.isNaN(numPrice) || numPrice < 0) {
        return res.status(400).json({ error: 'price must be a non-negative number' });
      }
      patch.price = numPrice;
    }
    if (req.body.description !== undefined) {
      patch.description = String(req.body.description);
    }

    const updated = await Product.update(id, patch);
    if (!updated) return res.status(404).json({ error: 'Not found' });

    res.json(updated);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const deleted = await Product.remove(id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });

    res.status(204).send();
  } catch (e) { next(e); }
};
