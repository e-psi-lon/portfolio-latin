import React from "react";
import Head from "next/head";
import styles from "../styles/sequence.module.css";
import { Header, Footer } from "../components";
import { useRouter } from 'next/router';
import * as Seconde from "../components/docs/seconde";
import * as Premiere from "../components/docs/premiere";



const pathToComponent = {
    base: {
        id: "base",
        component: (
            <>
                <Header />
                <main>
                    <h1>Travaux de Séquence</h1>
                    <ul>
                        <li>
                            <ul>
                                <li><a href="/sequence?niveau=seconde#1">Travail de Séquence 1 (seconde)</a></li>
                                <li><a href="/sequence?niveau=seconde#2">Travail de Séquence 2 (seconde)</a></li>
                                <li><a href="/sequence?niveau=seconde#3">Travail de Séquence 3 (seconde)</a></li>
                                <li><a href="/sequence?niveau=seconde#4">Travail de Séquence 4 (seconde)</a></li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li><a href="/sequence?niveau=premiere#1">Travail de Séquence 1 (première)</a></li>
                                <li><a href="/sequence?niveau=premiere#2">Travail de Séquence 2 (première)</a></li>
                                <li><a href="/sequence?niveau=premiere#3">Travail de Séquence 3 (première)</a></li>
                                <li><a href="/sequence?niveau=premiere#4">Travail de Séquence 4 (première)</a></li>
                            </ul>
                        </li>
                    </ul>

                </main>
                <Footer />
            </>
        )
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
                component: <Seconde.Sequence1 />
            },
            {
                name: "Travail de Séquence 3 (seconde)",
                component: <Seconde.Sequence1 />
            },
            {
                name: "Travail de Séquence 4 (seconde)",
                component: <Seconde.Sequence1 />
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
    if (niveau == undefined || niveau == "" || niveau == null || sequence == undefined || sequence == "" || sequence == null) {
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
                    {pathToComponent["base"]["component"]}
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