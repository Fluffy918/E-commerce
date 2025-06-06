import orderModel from '../models/order.model.js';

export async function createOrder(req, res, next){
    try {
        const userId = req.user.id
        const { total_amount, items } = req.body
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Le panier est vide'})
        }
        const orderId = await orderModel.createOrder(userId, total_amount, items)
        res.status(201).json({ orderId })
    } catch (err) {
        next(err);
    }
}

export async function getUserOrders(req, res, next){
    try {
        const userId = req.user.id
        const orders = await orderModel.getOrdersByUser(userId)
        res.json(orders)
    } catch (err) {
        next(err);
    }
}

export default {
    createOrder,
    getUserOrders
};