const express = require('express');
const cors = require('cors');
const connectDB = require('./Database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Call DB connection
connectDB();

// Routes
const userRoutes = require('./Router');
app.use('/api', userRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server running');
});

// Server start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});