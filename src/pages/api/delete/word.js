import { getDb } from '../lib/db';
import jwt from "jsonwebtoken";
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
        const { id, token } = req.body;
        if(!id || !token) {
            let missingParameters = [];
            if (!id) {
                missingParameters.push('id');
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
            await sql('DELETE FROM word WHERE id = $1;', [id]);
            return res.status(200).json({ message: 'Word deleted' });
        }
        catch (err) {
            console.error('Error deleting word:', err);
            return res.status(500).json({ message: `Error while removing word : ${err}` });
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
