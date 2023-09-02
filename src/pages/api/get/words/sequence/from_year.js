import { sql } from "@vercel/postgres";


export default async function handler(req, res) {
    if (req.method === "GET") {
        const { year } = req.query;
        if (!year) {
            return res.status(400).send("Missing parameter 'year'");
        }
        try {
            const year_id = (await sql`SELECT id FROM year WHERE name = ${year}`).rows[0].id;
            const sequences = (await sql`SELECT * FROM sequence WHERE year_id = ${year_id}`).rows;
            return res.status(200).json(sequences);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}
