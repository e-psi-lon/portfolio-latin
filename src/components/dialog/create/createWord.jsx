import React, { useState } from "react";
import styles from "@/src/styles/dialog.module.css";
import words from "@/data/words.json";
import axios from "axios";
import MarkdownRenderer from "@/src/components/markdownRenderer.jsx";


const CreateWord = ({ dialogFunc }) => {

    const resetWord = () => {
        setWord("");
        setSequence("");
        setClasse("");
        setDefinition("");
        setSequences([]);
    };

    const createWord = async (valid) => {
        if (!valid) {
            dialogFunc(null);
            return;
        }
        try {
            response = await axios.post("/api/create/word", { word: word, classe: classe, sequence: sequence, definition: definition });
            if (response.status !== 200) {
                throw new Error("Erreur lors de la création du mot");
            }
        } catch (error) {
            console.log(error);
        }
        dialogFunc(null);
    };
    
    const getSequences = (a_classe) => {
        if (a_classe === null) {
            return [];
        }
        const sequences = [];
        if (a_classe === "") {
            return []
        }
        for (const sequence of words[a_classe].sequences) {
            sequences.push(<option value={sequence.id}>{sequence.id}</option>);
        }
        return sequences;
    };
    const [word, setWord] = useState("");
    const [sequences, setSequences] = useState([]);
    const [sequence, setSequence] = useState("");
    const [classe, setClasse] = useState("");
    const [definition, setDefinition] = useState("");
    return (
        <>
            <div id="createWord" className={styles.dialogContainer}>
                <div className={styles.dialogBox}>
                    <h3 className={styles.dialogTitle}>Quel mot voulez-vous créer ?</h3>
                    <div className={styles.dialogTextContainer}>
                        <label className={styles.dialogTextLabel} htmlFor="word">Mot</label>
                        <input type="text" className={styles.dialogTextInput} id="word" name="word" onChange={(event) => setWord(event.target.value)} placeholder="Mot à ajouter" value={word} />
                    </div>
                    <div className={styles.dialogTextAreaContainer}>
                        <label className={styles.dialogTextAreaLabel} htmlFor="definition">Définition (styles supportés : **<b>gras</b>**, _<i>italique</i>_, ~~<s>barré</s>~~, --<u>souligné</u>--, +<sup>exposant</sup>+, -<sub>indice</sub>-)</label>
                        <textarea className={styles.dialogTextAeraInput} onChange={(event) => {setDefinition(event.target.value)}} id="definition" name="definition" placeholder="Définition du mot" value={definition} />
                        <div className={styles.dialogTextPreviewContainer}>
                            <MarkdownRenderer toRender={definition} />
                        </div>
                    </div>
                    <div className={styles.dialogDropdownContainer}>
                        <label className={styles.dialogDropdownLabel} htmlFor="classe">Classe</label>
                        <select className={styles.dialogDropdownInput} onChange={(event) => {setClasse(event.target.value);setSequence("");setSequences(getSequences(event.target.value))}} id="classe" name="classe" placeholder="Classe" value={classe}>
                            <option value="" disabled hidden className="placeholder">Classe</option>
                            <option value="seconde">Seconde</option>
                            <option value="premiere">Première</option>
                            <option value="terminale">Terminale</option>
                        </select>
                    </div>
                    <div className={styles.dialogDropdownContainer}>
                        <label className={styles.dialogDropdownLabel} htmlFor="sequence">Séquence</label>
                        <select className={styles.dialogDropdownInput} onChange={(event) => setSequence(event.target.value)} id="sequence" name="sequence" placeholder="Séquence" value={sequence}>
                            <option value="" disabled hidden className="placeholder">Séquence</option>
                            {sequences.map(sequence => sequence)}
                        </select>
                    </div>
                    <div className={styles.dialogValidationContainer}>
                        <div className={styles.dialogButtonContainer}>
                            <button onClick={() => createWord(false)}>Annuler</button>
                        </div>
                        <div className={styles.dialogButtonContainer}>
                            <button onClick={() => createWord(true)}>Confirmer</button>
                        </div>
                        <div className={styles.dialogButtonContainer}>
                            <button onClick={() => resetWord()}>Réinitialiser</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
    
export default CreateWord;