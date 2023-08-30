import React, { useState } from "react";
import * as create from "@/src/components/dialog/create";
import styles from "@/src/styles/admin.module.css";

const Words = () => {
    const handleDialogCreateClose = (selectedOption) => {
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
                <ul className={styles.adminChoices}>
                    <li className={styles.adminChoice}><button onClick={() => setDialog(<create.CreateWhat onClose={handleDialogCreateClose} />)} className={styles.adminChoiceButton}>Création</button></li>
                    <li className={styles.adminChoice}><button>Modification</button></li>
                    <li className={styles.adminChoice}><button>Suppression</button></li>
                </ul>
            </div>
        </>
    );

}

export default Words;