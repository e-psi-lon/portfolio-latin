import React, { useState } from "react";
import Head from "next/head";
import { Header, Footer } from "../components";
import styles from "../styles/motconcept.module.css";


const pathToComponent = {
    seconde: {
        id: "Seconde",
        sequences: [
            {
                id: "Sequence 1 : L'Homme et L'Animal",
                words: [
                    {
                        word: "Animal, Animalis, n.",
                        definition: <>
                            Désigne d’abord tout être vivant, doué de souffle (<b><i>anima, ae, f</i></b>), et donc aussi bien les hommes que les bêtes, par opposition aux être inanimés. Dans un sens plus restreint et péjoratif ce mot sert pour nommer les bêtes.
                        </>
                    },
                    {
                        word: "Homo, Hominis, m.",
                        definition: <>
                            Caractérise les humains par rapport aux animaux. Homo signifie donc être humain tandis que vir désigne l’homme par rapport à la femme.
                        </>
                    }
                ]
            },
            {
                id: "Sequence 2 : L'Homme et le Divin",
                words: [
                ]
            }
        ]
    },
    premiere: {
        id: "Premiere",
        sequences: [
            {
                id: "Sequence 1 : La parole et les dérives",
                words: [
                    {
                        word: "Res Publica, f.",
                        definition: <>
                            La chose publique, c'est-à-dire du peuple. Désigne traditionellement la période de l'histoire romaine comprise entre la fin de la monarchie et le début de l'Empire (501-27 avant J.-C.). Sa devise, <b><i>Senatus PopulusQue Romanus</i></b>, représente l'ensemble du peuple romain.
                        </>
                    },
                    {
                        word: "Civitas, aris, f.",
                        definition: <>
                            La cité. Mot dérivé de <b><i>civis, is, m.</i></b>, le citoyen. Désigne l'ensemble des citoyens, la cité au sens d'unité politique par opposition à <b><i>urbes, urbis, f.</i></b>, la ville. Désigne aussi la qualité de citoyen et notamment le droit de cité.
                        </>
                    },
                    {
                        word: "Heros, Herois, m.",
                        definition:<>
                            (reprise du grec ἥρως) Être humain remarquable soit parce que progéniture d'un dieu soit parce qu'il a accompli des exploits ; également personnage d'une épopée ou fondateur d'une ville.
                        </>
                    }
                ]
            },
            {
                id: "Sequence 2 : La religion domestique",
                words: [
                    {
                        word: "Numen, inis, n.",
                        definition: <>
                            L'acquiescement, la volonté, l'ordre puis la puissance divine, la divinité (sens plus absolu que <b><i>deus, i, m.</i></b>).
                        </>
                    },
                    {
                        word: "Religio, onis, f.",
                        definition: <>
                            Le scrupule, la crainte pieuse, la croyance, le culte, le respect sacré (sens plus ouvert qu'en français).
                        </>
                    }
                ]
            },
            {
                id: "Sequence 3 : Amour, amants, amantes",
                words: [
                    {
                        word: "Ardor, oris, m.",
                        definition: <>
                            Le feu, l'embrasement. Désigne par métaphore, les sentiments amoureux qui brûlent les corps et les âmes. On le traduit par l'ardeur, la passion. Le verbe <b><i>ardeo, es, ere</i></b> (brûler, être ardent) possède le même double sens, physique et figuré.
                        </>
                    }
                ]
            },
            {
                id: "Séquence 4 : Oublié (à compléter)",
                words: [
                    {
                        word: "",
                        definition: <>
                            Rien ici pour le moment
                        </>
                    }
                ]
            }
        ]
    },
    terminale: {
        id: "Terminale",
        sequences: [
            {
                id: "sequence1",
                words: [
                    {
                        word: "mot1",
                        definition: <>
                            definition1
                        </>
                    }
                ]
            }
        ]
    },
}



const MotConcept = () => {
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
                <p className={styles.classe_list}>{pathToComponent[niveau].id}</p>
                <ul className={styles.motconcept_sequence}>
                        {
                            pathToComponent[niveau].sequences.map((sequence, index) => {
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
                                                                <span className={styles.mot}>{word["word"]}</span> : {word["definition"]}
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