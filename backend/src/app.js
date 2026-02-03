import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import routes
import authRoutes from './routes/auth.routes.js';
import farmerRoutes from './routes/farmer.routes.js';

app.use('/auth', authRoutes);
app.use('/farmer', farmerRoutes);




export default app;