const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 request per IP
});
app.use(limiter);

// Routes
const quakeRoutes = require('./routes/quake');
app.use('/', quakeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
