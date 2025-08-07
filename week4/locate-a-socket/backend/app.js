const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const socketRoutes = require('./routes/socketRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/sockets', socketRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

module.exports = app;



