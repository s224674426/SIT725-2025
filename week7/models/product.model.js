const db = require('../config/db');

exports.findAll = async () => {
  const { rows } = await db.query('SELECT id,name,price,description FROM products ORDER BY id');
  return rows;
};

exports.findById = async (id) => {
  const { rows } = await db.query('SELECT id,name,price,description FROM products WHERE id=$1', [id]);
  return rows[0];
};

exports.create = async ({ name, price, description }) => {
  const { rows } = await db.query(
    'INSERT INTO products(name,price,description) VALUES ($1,$2,$3) RETURNING id,name,price,description',
    [name, price, description || null]
  );
  return rows[0];
};
