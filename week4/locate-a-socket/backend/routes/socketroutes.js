const express = require('express');
const router = express.Router();
const Socket = require('../models/socket');



router.post('/add', async (req, res) => {
  try {
    const { name, location, type, accessibility } = req.body;

    // Validate required fields
    if (!name || !location || !type || typeof accessibility !== 'boolean') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Create a new socket document
    const newSocket = new Socket({
      name,
      location,
      type,
      accessibility,
    });

    // Save to MongoDB
    const savedSocket = await newSocket.save();
    res.status(201).json({ message: 'Socket added successfully', data: savedSocket });
  } catch (error) {
    console.error('❌ Error adding socket:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


