import { getDb } from '../lib/db';
import jwt from 'jsonwebtoken';
import Cors from 'cors'
import initMiddleware from '../lib/init-middleware'

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    })
)

export default async function handler(req, res) {
    await cors(req, res)
    if (req.method === 'POST') {
        const { sequence, word, definition, token } = req.body;
        if(!word || !sequence || !definition || !token) {
            let missingParameters = [];
            if (!word) {
                missingParameters.push('word');
            }
            if (!sequence) {
                missingParameters.push('sequence');
            }
            if (!definition) {
                missingParameters.push('definition');
            }
            if (!token) {
                missingParameters.push('token');
            }
            return res.status(400).json({ message: `Missing parameters : ${missingParameters.join(', ')}` });
        }
        const tokenValid = await checkToken(token);
        if(!tokenValid) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        try {
            const sql = getDb();
            await sql('INSERT INTO word (sequence_id, word, definition) VALUES ($1, $2, $3);', [sequence, word, definition]);
            return res.status(200).json({ message: 'Word created' });
        }
        catch (err) {
            console.error('Error creating word:', err);
            return res.status(500).json({ message: `Error while creating word : ${err}` });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}



async function checkToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.username) {
            return false;
        }
        const sql = getDb();
        const users = await sql('SELECT * FROM users WHERE username = $1', [decoded.username]);
        return users && users.length > 0;

    } catch (error) {
        console.error('Token verification error:', error);
        return false;
    }
}

