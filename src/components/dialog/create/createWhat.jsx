import React, { useState } from "react";
import dialogStyles from "@/src/styles/dialog.module.css";

const CreateWhat = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState("mot");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleConfirm = () => {
        onClose(selectedOption);
    };

    
    return (
        <div className={dialogStyles.dialogContainer}>
            <div className={dialogStyles.dialogBox}>
                <h3 className={dialogStyles.dialogTitle}>Que voulez-vous créer ?</h3>
                <label className={dialogStyles.dialogRadioLabel}>
                    <input
                        type="radio"
                        value="mot"
                        className={dialogStyles.dialogRadioInput}
                        checked={selectedOption === "mot"}
                        onChange={handleOptionChange}
                    />
                    Créer un mot
                </label>
                <label className={dialogStyles.dialogRadioLabel}>
                    <input
                        type="radio"
                        value="sequence"
                        className={dialogStyles.dialogRadioInput}
                        checked={selectedOption === "sequence"}
                        onChange={handleOptionChange}
                    />
                    Créer une séquence
                </label>
                <div className={dialogStyles.dialogButtonContainer}>
                    <button onClick={handleConfirm}>Confirmer</button>
                </div>
                <div className={dialogStyles.dialogButtonContainer}>
                    <button onClick={() => onClose(null)}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default CreateWhat;
