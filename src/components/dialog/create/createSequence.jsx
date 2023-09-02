import React, { useState } from "react";
import styles from "@/src/styles/dialog.module.css";
import axios from "axios";


const CreateSequence = ({ dialogFunc, token }) => {

    const resetSequence = () => {
        setSequence("");
        setYear("");
    };

    const createSequence = async (valid) => {
        if (!valid) {
            dialogFunc(null);
            return;
        }
        try {
            const yearId = year === "seconde" ? 1 : year === "premiere" ? 2 : 3;
            response = await axios.post("/api/create/sequence", { sequence: sequence, year: yearId, token: token });
            if (response.status !== 200) {
                throw new Error(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        dialogFunc(null);
    };

    const [sequence, setSequence] = useState("");
    const [year, setYear] = useState("");
    return (
        <>
            <div id="createSequence" className={styles.dialogContainer}>
                <div className={styles.dialogBox}>
                    <h3 className={styles.dialogTitle}>Quelle séquence voulez-vous créer ?</h3>
                    <div className={styles.dialogDropdownContainer}>
                        <label className={styles.dialogDropdownLabel} htmlFor="year">Classe</label>
                        <select className={styles.dialogDropdownInput} id="year" name="year" onChange={(event) => setYear(event.target.value)} value={year} placeholder="Classe">
                            <option value="" disabled hidden className="placeholder">Classe</option>
                            <option value="seconde">Seconde</option>
                            <option value="première">Première</option>
                            <option value="terminale">Terminale</option>
                        </select>
                    </div>
                    <div className={styles.dialogTextContainer}>
                        <label className={styles.dialogTextLabel} htmlFor="sequence">Séquence</label>
                        <input type="text" className={styles.dialogTextInput} id="sequence" name="sequence" onChange={(event) => setSequence(event.target.value)} placeholder="Séquence à ajouter" value={sequence} />
                    </div>
                    <div className={styles.dialogValidationContainer}>
                        <div className={styles.dialogButtonContainer}>
                            <button onClick={() => createSequence(false)}>Annuler</button>
                        </div>
                        <div className={styles.dialogButtonContainer}>
                            <button onClick={() => createSequence(true)}>Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
    
export default CreateSequence;