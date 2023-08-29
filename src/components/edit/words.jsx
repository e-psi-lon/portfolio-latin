import React, { useState } from "react";
import styles from "@/src/styles/admin.module.css";
import { useRouter } from "next/router";
import words from "@/data/words.json";
import CreateWhat from "@/src/components/dialog/create";


// words est un objet qui contient des clés qui sont les noms des classes de mots (seconde, premiere, terminale),
// Les valeurs de ces clés sont primo un id (seconde, premiere, terminale) et secundo un tableau de séquences
// Chaque séquence est un objet qui contient un id (Sequence 1 : <titre de la séquence>) et un tableau de mots
// Chaque mot est un objet qui contient un mot (Animal, Animalis, n.) et une définition et cette definition est une liste d'objets
// Chaque objet contient un type (text, italic, bold) et un texte (le texte à afficher)

const Words = () => {
    const router = useRouter();
    const [dialog, setDialog] = useState(null);
    return (
        <>
            <div id="createWhat" className={styles.dialog}>
                {dialog}
                <ul>
                    <li><button onClick={() => setDialog(<CreateWhat />)}>Création</button></li>

                </ul>
            </div>
        </>
    );

}

export default Words;