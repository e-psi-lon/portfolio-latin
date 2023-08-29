import React from "react";
import Head from "next/head";
import { Header, Footer } from "../components";
import styles from "../styles/index.module.css";

const IntSequence = () => {
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
                </main>
            </div>
            <Footer />
        </>
    );
};

export default IntSequence;