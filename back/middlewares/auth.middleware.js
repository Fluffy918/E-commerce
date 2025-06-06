import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

export function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token invalide ou expiré' })
        req.user = { id: decoded.id, role: decoded.role };
        next();
    })
} 

export function isAdmin(req, res, next){
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé, rôle admin requis'})
    }
    next();
}


config();