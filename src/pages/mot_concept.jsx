import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import { Header, Footer } from "../components/";
import styles from "../styles/index.module.css";


const pathToComponent = {
    seconde: {
        id: "seconde",
        sequences: [
            {
                id: "sequence1",
                words: [
                    {
                        word: "mot1",
                        definition: "def1"
                    }
                ]
            }
        ]
    },
    premiere: {
        id: "premiere",
        sequences: [
            {
                id: "sequence1",
                words: [
                    {
                        word: "mot1",
                        definition: "def1"
                    }
                ]
            }
        ]
    },
    terminale: {
        id: "terminale",
        sequences: [
            {
                id: "sequence1",
                words: [
                    {
                        word: "mot1",
                        definition: "def1"
                    }
                ]
            }
        ]
    },
}



const MotConcept = () => {
    let content = <></>;
    const router = useRouter();
    let niveau = router.asPath.split("#")[1];
    if (!(niveau == undefined || niveau == "" || niveau == null || !["seconde", "premiere", "terminale"].includes(niveau))) { 
        content = (
            <>
                <ul className={styles.motconcept_sequence}>
                    {
                        pathToComponent[niveau].sequences.map((sequence, index) => {
                            return (
                                <li key={index}>
                                    {sequence["id"]}
                                    <div className={styles.spacer}></div>
                                    <ul className={styles.motconcept}>
                                        {
                                            sequence["words"].map((word, index) => {
                                                return (
                                                    <>
                                                        <li key={index} className={styles.motconcept_word}>
                                                            <span className={styles.mot}>{word["word"]} : </span>{word["definition"]}
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
                <main>
                    <ul>
                        <li><button className={styles.button} onClick={() => window.location.href = "#seconde"}>Seconde</button></li>
                        <li><button className={styles.button} onClick={() => window.location.href = "#premiere"}>Première</button></li>
                        <li><button className={styles.button} onClick={() => window.location.href = "#terminale"}>Terminale</button></li>
                    </ul>
                    {content}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MotConcept;