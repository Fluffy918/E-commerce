import pool from '../config/db.js'

async function getAllProducts(){
    const [rows] = await pool.query('SELECT * FROM products')
    return rows;
}

async function getProductById(id){
    const [row] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return row[0];
}

async function createProduct({ name, description, price, image_url, stock, category }){
    const [result] = await pool.query(
        `INSERT INTO products (name, description, price, image_url, stock, category)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [name, description, price, image_url, stock, category]
    )
    return result.insertID;
}

async function updateProduct(id, fields){
    const setClause = []
    const values = []
    for (let key in fields) {
        setClause.push(`${key} = ?`)
        values.push(fields[key])
    }
    values.push(id)
    const sql = `UPDATE products SET ${setClause.join(', ')} WHERE id = ?`
    await pool.query(sql, values)
}

async function deleteProduct(id){
    await pool.query('DELETE FROM products WHERE id = ?', [id])
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};