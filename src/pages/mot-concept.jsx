import React, { useState } from "react";
import Head from "next/head";
import { Header, Footer } from "../components";
import styles from "../styles/motconcept.module.css";
import MarkdownRenderer from "../components/markdownRenderer";
import axios from "axios";

const MotConcept = () => {
    const [content, setContent] = useState(
        <>
            <p className={styles.p}>
                Les mots concepts apparaîtront ici quand vous cliquerez sur l'un des boutons ci-dessus.
            </p>
        </>
    );
    const changeContent = async (niveau) => {
        setContent(<>
            <p className={styles.loading}>
                Chargement...
            </p>
        </>
        );
        const niveauToAsk = niveau === "seconde" ? "Seconde" : niveau === "premiere" ? "Première" : "Terminale";
        const sequence_request = await axios.get("/api/get/words/sequence/from_year", { params: { year: niveauToAsk } });
        const sequences = sequence_request.data;
        const words_by_sequence = sequences.map(async (sequence) => {
            const words_request = await axios.get("/api/get/words/words/from_sequence", { params: { sequence: sequence.id } });
            const words = words_request.data;
            return words ? words : [];
        });
        for (let i = 0; i < words_by_sequence.length; i++) {
            words_by_sequence[i] = await words_by_sequence[i];
        }
        const newContent = (
            <>
                <p className={styles.year_list}>{niveauToAsk}</p>
                <ul className={styles.motconcept_sequence}>
                    {sequences.map((sequence, index) => {
                        return (
                            <li key={index}>
                                <div className={styles.spacer}></div>
                                <p className={styles.sequence}>{sequence.name}</p>
                                <ul className={styles.motconcept}>
                                    {words_by_sequence[index].map((word, index2) => {
                                        return <>
                                            <li key={index2} className={styles.motconcept_word}>
                                                <span className={styles.mot}>{word.word}</span> : <MarkdownRenderer toRender={word.definition} />
                                            </li>
                                            <br/>
                                        </>
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </>
        );
        setContent(newContent);
    }
    return (
        <>
            <Head>
                <title>Portfolio – Mots Concepts</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <style>{`
                    html {
                        color:#FFFFFF;
                        background-color: #48465D;
                        font-family: monospace;
                    }
                    body {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        position: relative;
                    }
                    `}</style>
            </Head>
            <div className={styles.content}>
                <Header />
                <h2 className={styles.subtitle}>Vous trouverez ci-dessous la liste de tous les mots concepts de chaque séquence, accompagnés de leur définition</h2>
                <main>
                    <ul className={styles.niveau}>
                        <li className={styles.li}><button key="1" className={`${styles.button} ${styles.year}`} onClick={() => changeContent("seconde")}>Seconde</button></li>
                        <li className={styles.li}><button key="2" className={`${styles.button} ${styles.year}`} onClick={() => changeContent("premiere")}>Première</button></li>
                        <li className={styles.li}><button key="3" className={`${styles.button} ${styles.year}`} onClick={() => changeContent("terminale")}>Terminale</button></li>
                    </ul>
                    {content}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MotConcept;