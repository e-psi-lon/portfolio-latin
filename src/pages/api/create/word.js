import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

export default async function handler(req, res) {
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
        console.log(`Will try to create word ${word} with definition "${definition}" in sequence ${sequence}`)
        try {
            await sql`INSERT INTO word (sequence_id, word, definition) VALUES (${sequence}, ${word}, ${definition});`;
            return res.status(200).json({ message: 'Word created' });
        }
        catch (err) {
            return res.status(500).json({ message: `Error while creating word : ${err}` });
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

