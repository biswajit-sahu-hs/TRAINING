const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const consultationRoutes = require('./routes/consultation');
require('dotenv').config();

const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1); 
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });

// Enable CORS middleware to allow requests from any origin
app.use(cors());

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/consultation', consultationRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'route accessed' });
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
