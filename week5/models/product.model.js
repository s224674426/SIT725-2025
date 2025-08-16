const { query } = require('../config/db');

// Data access layer. No HTTP / req / res here.
module.exports = {
  async findAll() {
    const { rows } = await query(
      'SELECT id, name, price, description, created_at FROM products ORDER BY id ASC'
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await query(
      'SELECT id, name, price, description, created_at FROM products WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async create({ name, price, description }) {
    const { rows } = await query(
      `INSERT INTO products (name, price, description)
       VALUES ($1, $2, COALESCE($3, ''))
       RETURNING id, name, price, description, created_at`,
      [name, price, description]
    );
    return rows[0];
  },

  async update(id, { name, price, description }) {
    const { rows } = await query(
      `UPDATE products
         SET name = COALESCE($2, name),
             price = COALESCE($3, price),
             description = COALESCE($4, description)
       WHERE id = $1
       RETURNING id, name, price, description, created_at`,
      [id, name, price, description]
    );
    return rows[0];
  },

  async remove(id) {
    const { rows } = await query(
      'DELETE FROM products WHERE id = $1 RETURNING id',
      [id]
    );
    return rows[0];
  }
};
