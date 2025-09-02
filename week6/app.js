require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}
app.use(express.static(path.join(__dirname, 'public')));

// view engine (optional demo page)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// health check
app.get('/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'dev' });
});

// optional home page (renders a tiny UI that fetches products)
app.get('/', (req, res) => res.render('index'));

// API routes
app.use('/api/products', require('./routes/product.routes'));

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
