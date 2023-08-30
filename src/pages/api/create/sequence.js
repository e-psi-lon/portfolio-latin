

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { classe, sequence } = req.body;
        // Charger les informations d'utilisateur stockées (exemple)
        if( classe === null || sequence === null) {
            let missingParameters = [];
            if (classe === null) {
                missingParameters.push('classe');
            }
            if (sequence === null) {
                missingParameters.push('sequence');
            }
            res.status(400).json({ message: `Missing parameters : ${missingParameters.join(', ')}` });
            return;
        }
        const storedWords = require("@/data/words.json");
        const newSequence = {
            id: `Séquence ${storedWords[classe].sequences.length + 1} : ${sequence}`,
            words: []
        }
        storedWords[classe].sequences.push(newSequence);
        // On update le fichier
        const fs = require('fs');
        try {
            fs.writeFile('./data/words.json', JSON.stringify(storedWords), function (err) {
                if (err) throw err;
            });
            res.status(200).json({ message: 'Sequence created' });
        } catch (err) {
            res.status(500).json({ message: 'Error while creating sequence' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}