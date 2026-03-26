import { getDb } from '../../../lib/db';
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'

const cors = initMiddleware(
    Cors({
        methods: ['GET'],
    })
)



export default async function handler(req, res) {
    await cors(req, res)
    if (req.method === "GET") {
        const { sequence } = req.query;
        if (!sequence) {
            return res.status(400).send("Missing parameter 'sequence'");
        }
        try {
            const sql = getDb();
            const words = await sql('SELECT * FROM word WHERE sequence_id = $1', [sequence]);
            return res.status(200).json(words);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}
