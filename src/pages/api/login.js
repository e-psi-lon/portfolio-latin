import { createHash } from 'crypto';
import config from '@/config.js';
import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        // Charger les informations d'utilisateur stockées dans la base de données
        const sqlValue = await sql`SELECT * FROM users;`;
        const storedUser = sqlValue.rows[0];
        let hashedUsername = createHash('sha256').update(username).digest('hex');
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        if (storedUser.username === hashedUsername) {
            if (hashedPassword === storedUser.password) {
                // Authentification réussie
                const token = jwt.sign({ username: username, password:password }, process.env.SECRET_KEY, { expiresIn: '1h' });
                return res.status(200).json({ message: 'Authentication successful', token: token });
            } else {
                // Mot de passe incorrect
                return res.status(401).json({ message: 'Incorrect username or password' });
            }
        } else {
            // Nom d'utilisateur incorrect
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}
