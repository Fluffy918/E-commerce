import express from 'express';
import orderController from '../controllers/order.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/orders  -> créer une commande (utilisateur connecté)
router.post('/', verifyToken, orderController.createOrder);

router.get('/', verifyToken, orderController.getUserOrders)

// GET /api/orders  -> récupérer toutes les commandes du user connecté
router.get('/', verifyToken, isAdmin, orderController.getUserOrders);

export default router;