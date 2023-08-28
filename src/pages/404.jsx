import React from "react";
import Head from "next/head";
import styles from "../styles/404.module.css";
import { Footer } from "../components/";

const Page404 = () => {
    return (
        <>
            <Head>
                <title>404</title>
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
                <h1 className={styles.title_error}>404</h1>
                <p className={styles.subtitle_error}>Cette page n'existe pas</p>
                <div className={styles.center}>
                    <button onClick={() => window.history.back()} className={styles.button_go_back}>Revenir en lieu sûr</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Page404;