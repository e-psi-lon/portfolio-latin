import jwt from 'jsonwebtoken';
import config from '@/config.js';
import user from '@/data/user.json';
import { createHash } from 'crypto';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const token= req.body.token
        try {
            const decoded = jwt.verify(token, config.SECRET_KEY);
            if (!decoded) {
                throw new Error('Invalid token');
            }
            // On peut maintenant utiliser decoded.username et decoded.password pour vérifier l'identité de l'utilisateur
            const hashedDecodedUsername = createHash('sha256').update(decoded.username).digest('hex');
            const hashedDecodedPassword = createHash('sha256').update(decoded.password).digest('hex');
            if (user.username !== hashedDecodedUsername) {
                throw new Error('Invalid token');
            }
            if (user.password !== hashedDecodedPassword) {
                throw new Error('Invalid token');
            }
            // Authentification réussie
            res.status(200).json({ message: 'Authentication successful', token: token });
        } catch (error) {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

