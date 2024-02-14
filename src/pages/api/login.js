import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres'
import Cors from 'cors'
import initMiddleware from './lib/init-middleware'

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    })
)

export default async function handler(req, res) {
    await cors(req, res)
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const sqlValue = await sql`SELECT * FROM users;`;
        const storedUser = sqlValue.rows[0];
        let hashedUsername = createHash('sha256').update(username).digest('hex');
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        if (storedUser.username === hashedUsername) {
            if (hashedPassword === storedUser.password) {
                const token = jwt.sign({ username: username, password:password }, process.env.SECRET_KEY, { expiresIn: '60s' });
                return res.status(200).json({ message: 'Authentication successful', token: token });
            } else {
                return res.status(401).json({ message: 'Incorrect username or password' });
            }
        } else {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}
