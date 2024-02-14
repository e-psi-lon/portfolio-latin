import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';
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
        const { id, newWord, newDefinition, newSequence, token } = req.body;
        if(!id || !newWord || !newDefinition || !newSequence || !token) {
            let missingParameters = [];
            if (!id) {
                missingParameters.push('id');
            }
            if (!newWord) {
                missingParameters.push('newWord');
            }
            if (!newDefinition) {
                missingParameters.push('newDefinition');
            }
            if (!newSequence) {
                missingParameters.push('newSequence');
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
            await sql`UPDATE word SET word = ${newWord}, definition = ${newDefinition}, sequence_id = ${newSequence} WHERE id = ${id};`;
            return res.status(200).json({ message: 'Word updated' });
        }
        catch (err) {
            return res.status(500).json({ message: `Error while updating word : ${err}` });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}



async function checkToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return false;
        }
        const hashedDecodedUsername = createHash('sha256').update(decoded.username).digest('hex');
        const hashedDecodedPassword = createHash('sha256').update(decoded.password).digest('hex');
        const user = (await sql`SELECT * FROM users`).rows[0];
        return !(user.username !== hashedDecodedUsername || user.password !== hashedDecodedPassword);

    } catch (error) {
        return false;
    }
}
