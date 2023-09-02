import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';
import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body
        if (!token) {
            return res.status(400).json({ message: 'Missing parameters : token' });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded) {
                throw new Error('Invalid token');
            }
            const hashedDecodedUsername = createHash('sha256').update(decoded.username).digest('hex');
            const hashedDecodedPassword = createHash('sha256').update(decoded.password).digest('hex');
            const user = (await sql`SELECT * FROM users`).rows[0];
            if (user.username !== hashedDecodedUsername || user.password !== hashedDecodedPassword) {
                throw new Error('Invalid token');
            }
            // Authentification réussie
            return res.status(200).json({ message: 'Authentication successful', token: token });
        } catch (error) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}

