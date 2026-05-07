const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/issues', require('./routes/auditRoutes'));

app.use('/api/auth', require('./routes/authRoutes'));

// Default Route
app.get('/', (req, res) => {
  res.send('Audit Issue Aging Tracker API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});