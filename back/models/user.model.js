import pool from '../config/db.js';
import bcrypt from 'bcrypt';

exports.findByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    return rows[0];
}

exports.createUser = async (email, plainPassword, role = 'user') => {
    const password_hash = await bcrypt.hash(plainPassword, 10);
    const [result] = await pool.query(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
        [email, password_hash, role]
    )
    return { id: result.insertId, email, role };
}
