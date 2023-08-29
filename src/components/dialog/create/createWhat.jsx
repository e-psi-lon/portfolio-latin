import React from "react";
import { createSequence, createWord } from "@/src/components/dialog/create/createWord";
import styles from "@/src/styles/admin.module.css";

// Permet de choisir entre creer un mot ou creer une sequence

const createAndClose = (what) => {
    switch (what) {
        case "word":
            createWord();
            break;
        case "sequence":
            createSequence();
            break;
        default:
            break;
    }
    document.getElementById("createWhat").remove();
}

const CreateWhat = () => {
    return (
        <>
            <h1 className={styles.dialog_title}>Que voulez-vous créer ?</h1>
            <button onClick={() => createAndClose("word")} className={styles.dialog_button}>Un mot</button>
            <button onClick={() => createAndClose("sequence")} className={styles.dialog_button}>Une séquence</button>
        </>
    );
}
    
export default CreateWhat;