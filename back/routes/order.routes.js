import express from 'express';
import orderController from '../controllers/order.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const router = express.Router();

// POST /api/orders  -> créer une commande (utilisateur connecté)
router.post('/', verifyToken, orderController.createOrder);

// GET /api/orders  -> récupérer toutes les commandes du user connecté
router.get('/', verifyToken, orderController.getOrdersByUser);

module.exports = router