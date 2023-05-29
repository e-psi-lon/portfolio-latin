import React from "react";
import styles from "../../../styles/sequence.module.css";

const Sequence2 = () => {
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
                <h1 className={styles.title}>Séquence 2 : L'Homme et le Divin</h1>
                <h2 className={styles.subtitle}>Consigne : En quoi Thésée réunit-il les caractéristiques du héros mythologique</h2>
            </header>
            <main>
                <p className={styles.p}>Thésée réunit différentes caractéristiques du héros mythologique car il a accompli de nombreux exploits notamment en tuant le Minotaure. Il est aussi personnage de cette épopée qui est d'essayer de tuer le Minotaure. Enfin, et même si cela ne rentre pas dans les caractéristiques du héros, il fut le roi d'Athènes et aurait construit un palais sur l'Acropole.</p>
            </main>
        </>
    )
}

export default Sequence2;