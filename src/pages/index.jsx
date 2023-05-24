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
                    <p className={styles.p}>Dedans vous trouverez les mots concepts de chaque séquence accompagnés de leur définition respective. De plus les travaux de fin de séquence se trouvent dans leur section respective. Pour finir dans les différentes catégories, vous trouverez aussi les différents travaux fait lors des séquences (Pas encore mis en place)</p>
                    <p className={styles.p}>Pour finir, vous trouverez aussi le compte-rendu de la conférence des Rendez-vous de l'Histoire sur l'École des Chartes en <a className={`${styles.toujours} ${styles.a}`} href="files/ecole_des_chartes.html"> (Pas encore mis en place non plus) cliquant ici</a></p>
                    <p className={styles.p}>Petit bonus, vous pouvez accéder au code source du portfolio en cliquant sur le bouton ci-dessous : </p>
                    <a className={`${styles.github} ${styles.a}`} href="https://github.com/lilian-maulny/portfolio"> <img src="/github.png"  width={100} height={100} alt="github" /></a>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Index;