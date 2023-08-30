

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { word, classe, sequence, definition } = req.body;
        // Charger les informations d'utilisateur stockées (exemple)
        if(word === null || classe === null || sequence === null || definition === null) {
            let missingParameters = [];
            if(word === null) {
                missingParameters.push('word');
            }
            if(classe === null) {
                missingParameters.push('classe');
            }
            if(sequence === null) {
                missingParameters.push('sequence');
            }
            if(definition === null) {
                missingParameters.push('definition');
            }
            res.status(400).json({ message: `Missing parameters : ${missingParameters.join(', ')}` });
            return;
        }
        const storedWords = require("@/data/words.json");
        const sequenceIndex = storedWords[classe].sequences.findIndex((element) => element.id === sequence);
        const newWord = {
            word: word,
            definition: definition,
        }
        storedWords[classe].sequences[sequenceIndex].words.push(newWord);
        // On update le fichier
        const fs = require('fs');
        try {
            fs.writeFile('./data/words.json', JSON.stringify(storedWords), function (err) {
                if (err) throw err;
            });
            res.status(200).json({ message: 'Word created' });
        } catch (err) {
            res.status(500).json({ message: 'Error while creating word' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}