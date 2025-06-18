const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const dealerRoutes = require('./routes/dealers');
const reviewRoutes = require('./routes/reviews');

// Import DB connection
const connectDB = require('./db');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', dealerRoutes);
app.use('/', reviewRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Car Dealership API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;