import React, { useState } from "react";
import styles from "@/src/styles/dialog.module.css";
import axios from "axios";
import MarkdownRenderer from "@/src/components/markdownRenderer.jsx";


const EditWord = ({ dialogFunc, token }) => {
    let response = null;
    const resetWord = () => {
        setWord("");
        setSequence("");
        setYear("");
        setSequences([]);
    };

    const createWord = async (valid) => {
        if (!valid) {
            dialogFunc(null);
            return;
        }
        try {
            response = await axios.post("/api/edit/word", { id: id, newWord: newWord, newDefinition: newDefinition, newSequence: newSequence, token: token });
            if (response.status !== 200) {
                console.log("Erreur lors de la mise à jour du mot");
            }
        } catch (error) {
            console.log(error);
        }
        dialogFunc(null);
    };


    const getWords = async (a_sequence) => {
        let words_ = [];
        try {
            response = await axios.get("/api/get/words/words/from_sequence", { params: { sequence: a_sequence } });
            if (response.status !== 200) {
                console.log("Erreur lors de la récupération des mots : " + response.data);
            } else {
            response.data.forEach(word => {
                words_.push(<option key={word.id} value={word.id}>{word.word}</option>);
            });
            }
        } catch (error) {
            console.log(error);
        }
        setWords(words_);
    };
    
    const getSequences = async (a_year) => {
        const yearToAsk = a_year === "seconde" ? "Seconde" : a_year === "premiere" ? "Première" : "Terminale";
        let sequences_ = [];
        try {
            response = await axios.get("/api/get/words/sequence/from_year", { params: { year: yearToAsk } });
            if (response.status !== 200) console.log("Erreur lors de la récupération des séquences : " + response.data);
            else {
            response.data.forEach(sequence => {
                sequences_.push(<option key={sequence.id} value={sequence.id}>{sequence.name}</option>);
            });
            }
        } catch (error) {
            console.log(error);
        }
        setSequences(sequences_);
    };
    const [words, setWords] = useState([]);
    const [word, setWord] = useState("");
    const [newWord, setNewWord] = useState("");
    const [sequences, setSequences] = useState([]);
    const [sequence, setSequence] = useState("");
    const [newSequence, setNewSequence] = useState("");
    const [year, setYear] = useState("");
    const [newDefinition, setNewDefinition] = useState("");
    const [id, setId] = useState("");
    return (
        <>
            <div id="editWord" className={styles.dialogContainer}>
                <div className={styles.dialogBox}>
                    <h3 className={styles.dialogTitle}>Quel mot voulez-vous modifier ?</h3>
                    <div className={styles.dialogContent}>
                        <div className={styles.dropdownContainer}>
                            <label htmlFor="year">Année</label>
                            <select id="year" name="year" value={year} onChange={(e) => {
                                setYear(e.target.value);
                                getSequences(e.target.value).then(r => r);
                            }} defaultValue={year}>
                                <option value="" disabled hidden>Choisissez une année</option>
                                <option value="seconde">Seconde</option>
                                <option value="premiere">Première</option>
                                <option value="terminale">Terminale</option>
                            </select>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <label htmlFor="sequence">Séquence</label>
                            <select id="sequence" name="sequence" value={sequence} onChange={(e) => {
                                setSequence(e.target.value);
                                getWords(e.target.value).then(r => r);
                            }} defaultValue={sequence}>
                                <option value="" disabled hidden>Choisissez une séquence</option>
                                {sequences.map(sequence => sequence)}
                            </select>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <label htmlFor="word">Mot</label>
                            <select id="word" name="word" value={word} onChange={(e) => {
                                setWord(e.target.value);
                                axios.get("/api/get/words/words/from_id", { params: { id: e.target.value } }).then(response => {
                                    if (response.status !== 200) {
                                        throw new Error("Erreur lors de la récupération du mot : " + response.data);
                                    }
                                    setNewWord(response.data.word);
                                    setNewDefinition(response.data.definition);
                                    setNewSequence(response.data.sequence_id);
                                    setId(response.data.id);
                                }
                                ).catch(error => console.log(error));
                            }} defaultValue={word}>
                                <option value="" disabled hidden>Choisissez un mot</option>
                                {words.map(word => word)}
                            </select>
                        </div>
                        <div className={styles.dialogTextContainer}>
                            <label className={styles.dialogTextLabel} htmlFor="newWord">Mot</label>
                            <input type="text" className={styles.dialogTextInput} id="newWord" name="newWord" onChange={(event) => setNewWord(event.target.value)} placeholder="Mot à modifier" value={newWord} autoComplete="off" />
                        </div>
                        <div className={styles.dialogTextAreaContainer}>
                            <label className={styles.dialogTextAreaLabel} htmlFor="newDefinition">Définition</label>
                            <textarea className={styles.dialogTextAeraInput} onChange={(event) => {setNewDefinition(event.target.value)}} id="newDefinition" name="newDefinition" placeholder="Définition du mot" value={newDefinition} />
                            <div className={styles.dialogTextPreviewContainer}>
                                <MarkdownRenderer toRender={newDefinition} />
                            </div>
                        </div>
                        <div className={styles.dialogDropdownContainer}>
                            <label className={styles.dialogDropdownLabel} htmlFor="newSequence">Séquence</label>
                            <select className={styles.dialogDropdownInput} onChange={(event) => setNewSequence(event.target.value)} id="newSequence" name="newSequence" placeholder="Séquence" value={newSequence}>
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
            </div>
        </>
    );
}
    
export default EditWord;