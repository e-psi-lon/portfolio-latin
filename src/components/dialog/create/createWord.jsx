import React, { useState } from "react";
import styles from "@/src/styles/dialog.module.css";
import axios from "axios";
import MarkdownRenderer from "@/src/components/markdownRenderer.jsx";


const CreateWord = ({ dialogFunc, token }) => {

    let response = null;
    const resetWord = () => {
        setWord("");
        setSequence("");
        setYear("");
        setDefinition("");
        setSequences([]);
    };

    const createWord = async (valid) => {
        if (!valid) {
            dialogFunc(null);
            return;
        }
        try {
            response = await axios.post("/api/create/word", { sequence: sequence, word: word, definition: definition, token: token }); 
            if (response.status !== 200) {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        dialogFunc(null);
    };
    
    const getSequences = async (a_year) => {
        const yearToAsk = a_year === "seconde" ? "Seconde" : a_year === "premiere" ? "Première" : "Terminale";
        let sequences_ = [];
        try {
            response = await axios.get("/api/get/words/sequence/from_year", { params: { year: yearToAsk } });
            if (response.status !== 200) {
                return console.log(response.data);
            }
            response.data.forEach(sequence => {
                sequences_.push(<option key={sequence.id} value={sequence.id}>{sequence.name}</option>);
            });
        } catch (error) {
            console.log(error);
        }
        setSequences(sequences_);
    };
    const [word, setWord] = useState("");
    const [sequences, setSequences] = useState([]);
    const [sequence, setSequence] = useState("");
    const [year, setYear] = useState("");
    const [definition, setDefinition] = useState("");
    return (
        <>
            <div id="createWord" className={styles.dialogContainer}>
                <div className={styles.dialogBox}>
                    <h3 className={styles.dialogTitle}>Quel mot voulez-vous créer ?</h3>
                    <div className={styles.dialogTextContainer}>
                        <label className={styles.dialogTextLabel} htmlFor="word">Mot</label>
                        <input type="text" className={styles.dialogTextInput} id="word" name="word" onChange={(event) => setWord(event.target.value)} placeholder="Mot à ajouter" value={word} autoComplete="off" />
                    </div>
                    <div className={styles.dialogTextAreaContainer}>
                        <label className={styles.dialogTextAreaLabel} htmlFor="definition">Définition (styles supportés : **<b>gras</b>**, _<i>italique</i>_, ~~<s>barré</s>~~, --<u>souligné</u>--, +<sup>exposant</sup>+, -<sub>indice</sub>-)</label>
                        <textarea className={styles.dialogTextAeraInput} onChange={(event) => {setDefinition(event.target.value)}} id="definition" name="definition" placeholder="Définition du mot" value={definition} />
                        <div className={styles.dialogTextPreviewContainer}>
                            <MarkdownRenderer toRender={definition} />
                        </div>
                    </div>
                    <div className={styles.dialogDropdownContainer}>
                        <label className={styles.dialogDropdownLabel} htmlFor="year">Classe</label>
                        <select className={styles.dialogDropdownInput} onChange={(event) => {setYear(event.target.value);setSequence("");getSequences(event.target.value).then(r => r)}} id="year" name="year" placeholder="Classe" value={year}>
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
                            {sequences.map((sequence) => sequence)}
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