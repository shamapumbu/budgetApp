const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const budgetRoutes =  require('./routes/budgets')
const categoryRoutes = require('./routes/categories')
const transactionRoutes = require('./routes/transactions')
const authRoutes = require('./routes/authenticate')

// Load environment variables
dotenv.config();

// Set up Express app
const app = express();

// Enable CORS
app.use(cors());

// Set up middleware to handle JSON data
app.use(express.json());

//authentication routes
app.use('/api/authenticate', authRoutes)

//budget routes
app.use('/api/budgets', budgetRoutes)

//category routes
app.use('/api/categories', categoryRoutes)

//transaction routes
app.use('/api/transactions', transactionRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});