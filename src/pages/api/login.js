import { createHash } from 'crypto';
import config from '@/config.js';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        // Charger les informations d'utilisateur stockées (exemple)
        const storedUser = require("@/data/user.json");
        const hashedUsername = createHash('sha256').update(username).digest('hex');
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        if (storedUser.username === hashedUsername) {
        
            if (hashedPassword === storedUser.password) {
                // Authentification réussie
                const token = jwt.sign({ username: username, password:password }, config.SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ message: 'Authentication successful', token: token });
            } else {
                // Mot de passe incorrect
                res.status(401).json({ message: 'Incorrect username or password' });
            }
        } else {
            // Nom d'utilisateur incorrect
            res.status(401).json({ message: 'Incorrect username or password' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
