import React from "react";
import Head from "next/head";
import styles from "../styles/sequence.module.css";
import { Header, Footer } from "../components";
import { useRouter } from 'next/router';
import * as Seconde from "../components/docs/seconde";
import * as Premiere from "../components/docs/premiere";



const pathToComponent = {
    base: {
        id: "base"
    },
    seconde: {
        id: "seconde",
        sequences: [
            {
                name: "Travail de Séquence 1 (seconde)",
                component: <Seconde.Sequence1 />
            },
            {
                name: "Travail de Séquence 2 (seconde)",
                component: <Seconde.Sequence2 />
            },
            {
                name: "Travail de Séquence 3 (seconde)",
                component: <Seconde.Sequence3 />
            },
            {
                name: "Travail de Séquence 4 (seconde)",
                component: <Seconde.Sequence4 />
            }
        ]
    },
    premiere: {
        id: "premiere",
        sequences: [
            {
                name: "Travail de Séquence 1 (première)"
            },
            {
                name: "Travail de Séquence 1 (première)",
                component: <Premiere.Sequence2 />
            }
        ]
    },
    terminale: {
        id: "terminale",
        sequences: [
        ]
    }
}


const Sequence = () => {
    const router = useRouter();
    let niveau = router.query.niveau
    let sequence = router.asPath.split("#")[1];
    if (niveau == undefined || niveau == "" || niveau == null || sequence == undefined || sequence == "" || sequence == null || !["seconde", "premiere", "terminale"].includes(niveau) || isNaN(sequence) || sequence < 1 || sequence > 4) {
        return (
            <>
                <Head>
                    <title>Portfolio – Travaux de Séquence</title>
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
                        <h1>Travaux de Séquence</h1>
                        {Object.values(pathToComponent).filter((niveau) => niveau["id"] != "base").map((niveau, index1) => {
                            return (
                                <ul>
                                    <li key={index1}>
                                        <h2>{niveau["id"].charAt(0).toUpperCase() + niveau["id"].slice(1)}</h2>
                                        <ul>
                                            {niveau["sequences"].map((sequence, index2) => {
                                                return (
                                                    <li key={index2}>
                                                        <a className={styles.a} href={"/sequence?niveau=" + niveau["id"] + "#" + (niveau["sequences"].indexOf(sequence)+1)}>{sequence["name"]}</a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                </ul>
                            )
                        })}
                    </main>
                </div>
                <Footer />
            </>
        )
    } 
    return (
        <>
            <Head>
                <title>{pathToComponent[niveau]["sequences"][sequence-1]["name"]}</title>
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
                {pathToComponent[niveau]["sequences"][sequence-1]["component"]}
            </div>
            <Footer />
        </>
    )
}

export default Sequence;