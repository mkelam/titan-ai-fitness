import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import workoutRoutes from './routes/workout.routes';
import progressRoutes from './routes/progress.routes';
import transformRoutes from './routes/transform.routes';
import nutritionRoutes from './routes/nutrition.routes';
import gamificationRoutes from './routes/gamification.routes';

// Import middleware
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/transform', transformRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/gamification', gamificationRoutes);

// Static files for uploads
app.use('/uploads', express.static(process.env.UPLOAD_PATH || './uploads'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║     TITAN AI Backend Server            ║
  ╠════════════════════════════════════════╣
  ║  Status:  Running                      ║
  ║  Port:    ${PORT}                          ║
  ║  Mode:    ${process.env.NODE_ENV || 'development'}               ║
  ╚════════════════════════════════════════╝
  `);
});

export default app;
