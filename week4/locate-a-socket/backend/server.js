require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketRoutes = require('./routes/socketroutes');


const app = express();
app.use(cors());
app.use(express.json());

// Use socket routes
app.use('/api/sockets', socketRoutes);

// Root test
app.get('/', (req, res) => res.send('Server is running'));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ DB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

