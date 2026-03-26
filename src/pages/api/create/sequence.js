import { getDb } from '../lib/db';
import jwt from "jsonwebtoken";
import axios from "axios";
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
        const { sequence, year, token } = req.body;
        if(!year || !sequence || !token) {
            let missingParameters = [];
            if (year === null) {
                missingParameters.push('year');
            }
            if (sequence === null) {
                missingParameters.push('sequence');
            }
            if (token === null) {
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
            const yearToUse = year === 1 ? "Seconde" : year === 2 ? "Première" : "Terminale";
            const sequenceCount = (await axios.get('/api/get/words/sequence/from_year', { params: { year: yearToUse } })).data.length;
            let sequenceName = `Séquence ${sequenceCount + 1} : ${sequence}`;
            await sql('INSERT INTO sequence (year_id, name) VALUES ($1, $2)', [year, sequenceName]);
            return res.status(200).json({ message: 'Sequence created' });
        } catch (err) {
            console.error('Error creating sequence:', err);
            return res.status(500).json({ message: `Error while creating sequence : ${err}` });
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

