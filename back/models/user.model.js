import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

/**
 * 
 * @param {string} email 
 * @returns {Promise<Object|undefined>}
 */

async function findByEmail(email){
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    return rows[0];
}

/**
 * 
 * @param {string} email 
 * @param {string} plainPassword 
 * @param {string} role 
 * @returns {Promise<{id}>}
 */

async function createUser(email, plainPassword, role = 'user'){
    const password_hash = await bcrypt.hash(plainPassword, 10);
    const [result] = await pool.query(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
        [email, password_hash, role]
    )
    return { id: result.insertId, email, role };
}

export default {
    findByEmail,
    createUser
};
