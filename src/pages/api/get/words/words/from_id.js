import { sql } from '@vercel/postgres';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

const cors = initMiddleware(
    Cors({
        methods: ['GET'],
    })
);

export default async function handler(req, res) {
    await cors(req, res);
    if (req.method === 'GET') {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send("Missing parameter 'id'");
        }
        try {
            const word = (await sql`SELECT * FROM word WHERE id = ${id}`).rows[0];
            return res.status(200).json(word);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    }
}