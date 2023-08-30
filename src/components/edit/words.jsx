import React, { useState } from "react";
import * as create from "@/src/components/dialog/create";


// words est un objet qui contient des clés qui sont les noms des classes de mots (seconde, premiere, terminale),
// Les valeurs de ces clés sont primo un id (seconde, premiere, terminale) et secundo un tableau de séquences
// Chaque séquence est un objet qui contient un id (Sequence 1 : <titre de la séquence>) et un tableau de mots
// Chaque mot est un objet qui contient un mot (Animal, Animalis, n.) et une définition et cette definition est une liste d'objets
// Chaque objet contient un type (text, italic, bold) et un texte (le texte à afficher)



const Words = () => {
    const handleDialogClose = (selectedOption) => {
        setDialog(null);

        // Ici, vous pouvez gérer la suite en fonction de l'option sélectionnée
        if (selectedOption === "mot") {
            // On la truc de dialog de création de mot
            setDialog(<create.CreateWord dialogFunc={setDialog}/>);
        } else if (selectedOption === "sequence") {
            // On la truc de dialog de création de séquence
            setDialog(<create.CreateSequence dialogFunc={setDialog}/>);
        }
    };
    const [dialog, setDialog] = useState(null);
    return (
        <>
            <div>
                {dialog}
                <ul>
                    <li><button onClick={() => setDialog(<create.CreateWhat onClose={handleDialogClose} />)}>Création</button></li>
                    <li><button>Modification</button></li>
                    <li><button>Suppression</button></li>
                </ul>
            </div>
        </>
    );

}

export default Words;