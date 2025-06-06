import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const errorMiddleware = require('./middlewares/error.middleware');

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