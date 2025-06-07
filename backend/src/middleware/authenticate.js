import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET 

export const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if(!bearer) {
        return res.status(401).json({ error: 'Token requerido' })
    }
    const  [, token]  = bearer.split(' ');
    if(!token) {
        return res.status(401).json({ error: 'Token requerido' });
    }
    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}