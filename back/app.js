import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Points d’entrée des API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Middleware de gestion des erreurs
app.use(errorMiddleware);

module.exports = app;
config();

export default app;