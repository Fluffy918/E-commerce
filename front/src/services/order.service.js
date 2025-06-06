import api from "./api.js";

export function createOrder(orderData) {
    // orderData = { total_amount, items: [ {product_id, quantity, unit_price}, ... ] }
    return api.post('/orders', orderData);
}

export function fetchUserOrders() {
    // suppose que l’API lit le userId depuis le token
    return api.get('/orders');
}