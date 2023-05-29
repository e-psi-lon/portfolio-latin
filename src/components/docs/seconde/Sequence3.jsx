import React from "react";
import styles from "../../../styles/sequence.module.css";

const Sequence3 = () => {
    return (
        <>
            <header>
                <style>{`
                    @import url('https://unpkg.com/css.gg@2.0.0/icons/css/arrow-left.css');
                    .gg-arrow-left {
                        height: 2em;
                        width: 1em;
                        scale: var(--ggs, 4);
                        position: fixed;
                    }
                `}</style>
                <button className={styles.go_back}><a className={`${styles.a} ${styles.go_back_link}`} href="/sequence"><i className="gg-arrow-left"></i></a></button>
                <h1 className={styles.title}>Séquence 3 : Soi-même et l'autre</h1>
                <h2 className={styles.subtitle}>Consigne : </h2>
            </header>
            <main>
            </main>
        </>
    )
}

export default Sequence3;