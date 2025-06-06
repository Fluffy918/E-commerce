import pool from '../config/db.js';

async function createOrder(user_id, total_amount, items){
    // Insérer la commande (orders)
    const [orderResult] = await pool.query(
        'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
        [user_id, total_amount]
    )
    const orderId = orderResult.insertId;

    // Insérer chaque ligne dans order_items
    const insertItemsPromises = items.map(item => {
        return pool.query(
            `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
            VALUES (?, ?, ?, ?)`,
            [orderId, item.product_id, item.quantity, item.unit_price]
        )
    })
    await Promise.all(insertItemsPromises)

    return orderId
}

async function getOrdersByUser(user_id){
    const [orders] = await pool.query(
        'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
        [user_id]
    )
    return orders
}

export default {
    createOrder,
    getOrdersByUser
};