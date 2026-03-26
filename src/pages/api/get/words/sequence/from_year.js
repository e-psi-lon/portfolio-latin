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
        const { year } = req.query;
        if (!year) {
            return res.status(400).send("Missing parameter 'year'");
        }
        try {
            const sql = getDb();
            const sequences = await sql('SELECT sequence.* FROM sequence JOIN year ON sequence.year_id = year.id WHERE year.name = $1', [year]);
            return res.status(200).json(sequences);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}
