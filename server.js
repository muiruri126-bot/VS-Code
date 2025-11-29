
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import indicatorRoutes from './routes/indicator.js';
import auditRoutes from './routes/audit.js';
import actualsRoutes from './routes/actuals.js';
import emailRoutes from './routes/email.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const defaultOrigins = ['http://localhost:3000', 'http://localhost:5173'];
const allowedOrigins = (process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',')
  : defaultOrigins
).map(origin => origin.trim()).filter(Boolean);

// Restrict API access to known frontend origins while still allowing CLI tools.
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => res.send('COSME Backend API running'));
app.use('/api/auth', authRoutes);
app.use('/api/indicators', indicatorRoutes);
app.use('/api/actuals', actualsRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/email', emailRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});
