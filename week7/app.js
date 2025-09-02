const express = require('express');
const path = require('path');
const app = express();

// View engine (EJS) and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// --- API routes (make sure these files exist) ---
app.use(require('./routes/product.routes'));

// --- Page routes (fixes "Cannot GET /products" & "Cannot GET /realtime") ---
app.get('/', (_req, res) => res.redirect('/products'));
app.get('/products', (_req, res) => res.render('products', { title: 'Products' }));
app.get('/realtime', (_req, res) => res.render('realtime', { title: 'Week 7 Sockets Demo' }));

// Error JSON (so curl/browser shows a clear message)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
