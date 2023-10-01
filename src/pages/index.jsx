import React from "react";
import Head from "next/head";
import { Header, Footer } from "../components/";
import styles from "../styles/index.module.css";

const Index = () => {
    return (
        <>
            <Head>
                <title>Portfolio – Accueil</title>
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
                    <p className={styles.p}>Ceci est mon portfolio de latin pour mes années de lycée.</p>
                    <p className={styles.p}>Dedans vous trouverez les mots concepts de chaque séquence accompagnés de leurs définitions respectives. De plus, les travaux de fin de séquence se trouvent dans leur section associée. Ensuite, dans les différentes catégories, vous trouverez aussi les différents travaux réalisés lors des séquences (non encore mis en place).</p>
                    <p className={styles.p}>Pour finir, vous trouverez le compte-rendu de la conférence des Rendez-vous de l'Histoire sur l'École des Chartes <a className={`${styles.toujours} ${styles.a}`} onClick={router.push("/ecole-des-chartes")}> (non encore mis en place non plus) en cliquant ici</a>.</p>
                    <p className={styles.p}>Petit bonus : vous pouvez accéder au code source du portfolio en cliquant sur le bouton ci-dessous : </p>
                    <a className={`${styles.github} ${styles.a}`} href="https://github.com/e-psi-lon/portfolio-latin"> <img src="/github.png"  width={100} height={100} alt="github" /></a>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Index;