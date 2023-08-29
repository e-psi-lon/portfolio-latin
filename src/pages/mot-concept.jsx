import React, { useState } from "react";
import Head from "next/head";
import { Header, Footer } from "../components";
import styles from "../styles/motconcept.module.css";
let words = require("@/data/words.json");

const renderDefinition = (definition) => {
    return definition.map((item, index) => {
        // on split le type a chaque - pour pouvoir le traiter
        const text_type = item["type"].split("-");
        // Pour chaque type on ajoute l'element html correspondant, en ajoutant au 
        let content = item["content"];
        for (let i = 0; i < text_type.length; i++) {
            switch (text_type[i]) {
                case "italic":
                    content = <i>{content}</i>;
                    break;
                case "bold":
                    content = <b>{content}</b>;
                    break;
                case "underline":
                    content = <u>{content}</u>;
                    break;
                case "sup":
                    content = <sup>{content}</sup>;
                    break;
                case "sub":
                    content = <sub>{content}</sub>;
                    break;
                default:
                    break;
            }
        };
        // On retourne ensuite l'element html complet
        return <span key={index}>{content}</span>;
    });
};




const MotConcept = () => {
    // On actualise words au passage
    words = require("@/data/words.json");
    const [content, setContent] = useState(
        <>
            <p className={styles.p}>
                Les mots concepts apparaîtront ici quand vous cliquerai sur l'un des boutons ci-dessus.
            </p>
        </>
    );
    const changeContent = (niveau) => {
        
        const newContent = (
            <>
                <p className={styles.classe_list}>{words[niveau].id}</p>
                <ul className={styles.motconcept_sequence}>
                        {
                            words[niveau].sequences.map((sequence, index) => {
                                return (
                                    <li key={index}>
                                        <div className={styles.spacer}></div>
                                        <p className={styles.sequence}>{sequence["id"]}</p>
                                        <ul className={styles.motconcept}>
                                            {
                                                sequence["words"].map((word, index) => {
                                                    return (
                                                        <>
                                                            <li key={index} className={styles.motconcept_word}>
                                                                <span className={styles.mot}>{word["word"]}</span> : {renderDefinition(word["definition"])}
                                                            </li>
                                                            <br/>
                                                        </>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
            </>
        )
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
                <h2 className={styles.subtitle}>Vous trouverez ci-dessous la liste de tout les mots concepts de chaque séquence accompagnés de leur définition</h2>
                <main>
                    <ul className={styles.niveau}>
                        <li className={styles.li}><button key="1" className={`${styles.button} ${styles.classe}`} onClick={() => changeContent("seconde")}>Seconde</button></li>
                        <li className={styles.li}><button key="2" className={`${styles.button} ${styles.classe}`} onClick={() => changeContent("premiere")}>Première</button></li>
                        <li className={styles.li}><button key="3" className={`${styles.button} ${styles.classe}`} onClick={() => changeContent("terminale")}>Terminale</button></li>
                    </ul>
                    {content}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MotConcept;