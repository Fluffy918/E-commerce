import express from 'express';
import productController from '../controllers/product.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';
const router = express.Router();

// Get /api/products   -> accessible à tous
router.get('/', productController.getProducts);

// Get /api/products/:id   -> accessible à tous
router.get('/:id', productController.getProduct)

// POST /api/products   -> admin seulement
router.post('/', verifyToken, isAdmin, productController.createProduct);

// PUT /api/products/:id   -> admin seulement
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);

// DELETE /api/products/:id   -> admin seulement
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

export default router;