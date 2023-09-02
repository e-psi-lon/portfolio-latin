import axios from 'axios';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { sequence, year, token } = req.body;
        // Charger les informations d'utilisateur stockées (exemple)
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
        const tokenValid = axios.post('/api/checkToken', { token:token}).then((response) => {
            if(response.status === 200) {
                return true;
            }
            return false;
        });
        if(!tokenValid) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        try {
            const yearToUse = year === 1 ? "Seconde" : year === 2 ? "Première" : "Terminale";
            const sequenceCount = (await axios.get('/api/get/words/sequence/from_year', { params: { year: yearToUse } })).data.length;
            let sequenceName = `Séquence ${sequenceCount + 1} : ${sequence}`;
            console.log(sequenceName);
            const sqlValue = await sql`INSERT INTO sequence (year_id, name) VALUES (${year}, ${sequenceName})`;
            return res.status(200).json({ message: 'Sequence created' });
        } catch (err) {
            return res.status(500).json({ message: `Error while creating sequence : ${err}` });
        }
    } else {
        return res.status(405).json({ message: `Method ${req.method} not allowed here` });
    }
}