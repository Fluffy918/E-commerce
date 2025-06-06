import pool from '../config/db.js'

exports.getAllProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products')
    return rows;
}

exports.getProductById = async (id) => {
    const [row] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return row[0];
}

exports.createProduct = async ({ name, description, price, image_url, stock, category }) => {
    const [result] = await pool.query(
        `INSERT INTO products (name, description, price, image_url, stock, category)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [name, description, price, image_url, stock, category]
    )
    return result.insertID;
}

exports.updateProduct = async (id, fields) => {
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

exports.deleteProduct = async (id) => {
    await pool.query('DELETE FROM products WHERE id = ?', [id])
}