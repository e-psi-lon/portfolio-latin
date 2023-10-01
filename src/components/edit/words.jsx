import React, { useState } from "react";
import * as create from "@/src/components/dialog/create";
import * as edit from "@/src/components/dialog/edit";
import styles from "@/src/styles/admin.module.css";

const Words = ({ token }) => {
    const handleDialogCreateClose = (selectedOption) => {
        setDialog(null);
        if (selectedOption === "mot") {
            setDialog(<create.CreateWord dialogFunc={setDialog} token={token}/>);
        } else if (selectedOption === "sequence") {
            setDialog(<create.CreateSequence dialogFunc={setDialog} token={token}/>);
        }
    };

    const handleDialogEditClose = (selectedOption) => {
        setDialog(null);
        if (selectedOption === "mot") {
            setDialog(<edit.EditWord dialogFunc={setDialog} token={token}/>);
        } else if (selectedOption === "sequence") {
            setDialog(<edit.EditSequence dialogFunc={setDialog} token={token}/>);
        }
    };

    const [dialog, setDialog] = useState(null);
    return (
        <>
            <div>
                {dialog}
                <ul className={styles.adminChoices}>
                    <li className={styles.adminChoice}><button onClick={() => setDialog(<create.CreateWhat onClose={handleDialogCreateClose} />)} className={styles.adminChoiceButton}>Création</button></li>
                    <li className={styles.adminChoice}><button onClick={() => setDialog(<edit.EditWhat onClose={handleDialogEditClose} />)} className={styles.adminChoiceButton}>Modification</button></li>
                    <li className={styles.adminChoice}><button>Suppression</button></li>
                </ul>
            </div>
        </>
    );
}

export default Words;