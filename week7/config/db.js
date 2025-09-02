const hasConn = !!process.env.DATABASE_URL;
const isTest = process.env.NODE_ENV === 'test';

if (!hasConn || isTest) {
  console.warn('⚠️  Using in-memory DB stub (set DATABASE_URL for Postgres)');
  const data = { products: [] };

  module.exports = {
    query: async (sql, params = []) => {
      const s = String(sql).toLowerCase();

      if (s.includes('select') && s.includes('from products')) {
        if (s.includes('where id=')) {
          const id = Number(params[0]);
          const row = data.products.find(p => p.id === id);
          return { rows: row ? [row] : [], rowCount: row ? 1 : 0 };
        }
        return { rows: data.products, rowCount: data.products.length };
      }

      if (s.startsWith('insert into products')) {
        const [name, price, description] = params;
        const id = data.products.length + 1;
        const row = { id, name, price: Number(price), description: description ?? null };
        data.products.push(row);
        return { rows: [row], rowCount: 1 };
      }

      return { rows: [], rowCount: 0 };
    }
  };
} else {
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  (async () => {
    try { await pool.query('SELECT 1'); console.log('🗄️  DB connected'); }
    catch (e) { console.error('❌ DB connection failed:', e.message); }
  })();
  module.exports = pool;
}
