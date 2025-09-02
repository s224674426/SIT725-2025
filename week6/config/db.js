const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.warn('⚠️  DATABASE_URL not set in .env');
}

const pool = new Pool({ connectionString });

// simple helper to run parameterized queries
const query = (text, params) => pool.query(text, params);

// optional: quick self-test on first import
(async () => {
  try {
    await query('SELECT 1');
    console.log('🗄️  DB connected');
  } catch (e) {
    console.error('❌ DB connection failed:', e.message);
  }
})();

module.exports = { pool, query };
