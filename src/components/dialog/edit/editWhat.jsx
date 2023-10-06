import React, { useState } from "react";
import styles from "@/src/styles/dialog.module.css";

const EditWhat = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState("mot");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleConfirm = () => {
        onClose(selectedOption);
    };

    
    return (
        <div className={styles.dialogContainer}>
            <div className={styles.dialogBox}>
                <h3 className={styles.dialogTitle}>Que voulez-vous modifier ?</h3>
                <label className={styles.dialogRadioLabel}>
                    <input
                        type="radio"
                        value="mot"
                        className={styles.dialogRadioInput}
                        checked={selectedOption === "mot"}
                        onChange={handleOptionChange}
                    />
                    Modifier un mot
                </label>
                <label className={styles.dialogRadioLabel}>
                    <input
                        type="radio"
                        value="sequence"
                        className={styles.dialogRadioInput}
                        checked={selectedOption === "sequence"}
                        onChange={handleOptionChange}
                    />
                    Modifier une séquence
                </label>
                <div className={styles.dialogValidationContainer}>
                    <div className={styles.dialogButtonContainer}>
                        <button onClick={handleConfirm}>Confirmer</button>
                    </div>
                    <div className={styles.dialogButtonContainer}>
                        <button onClick={() => onClose(null)}>Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditWhat;
