import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model.js';
import { isEmailValid, hasMinimumLength } from '../utils/validators.js';
import { validationError } from '../utils/helpers.js';
import { config } from 'dotenv';

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé'})
        }
        if (!isEmailValid(email)) {
            return next(validationError('Email invalide'));
        }
        if (!hasMinimumLength(password, 8)) {
            return next(validationError('Le mot de passe doit contenir au moins 8 caractères'));
        }
        const newUser = await userModel.createUser(email, password)
        res.status(201).json({ id: newUser.id, email: newUser.email, role: newUser.role })
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findByEmail(email)
        if (!user) return res.status(401).json({ message: 'Adresse email ou mot de passe incorrect'})
        
        const bcrypt = require('bcryptjs')
        const valid = await bcrypt.compare(password, user.password_hash)
        if (!valid) return res.status(401).json({ message: 'Adresse email ou mot de passe incorrect'})
        
        const payload = { id: user.id, role: user.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token, user: { id: user.id, email: user.mail, role: user.role}})
    } catch (err) {
        next(err)
    }
}