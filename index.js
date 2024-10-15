require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const comicBookRoutes = require('./routes/comicBookRoutes');

// Connect to the database
connectDB();

const app = express();
app.use(express.json());  // For parsing JSON requests

// Define the routes
app.use('/api', comicBookRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
