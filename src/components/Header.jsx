import React from "react";
import styles from "../styles/index.module.css";
import { useRouter } from "next/router";

const navbar = [
    {
        name: "Accueil",
        link: "/"
    },
    {
        name: "Mots Concepts",
        link: "/mot_concept"
    },
    {
        name: "Travaux de Séquence (ne pas cliquer)",
        link: "/int_sequence"
    },
    {
        name: "Travaux de Fin de Séquence",
        link: "/sequence"
    }
];


const Header = () => {
    const router = useRouter();
    const page = (
        <>
            <h1 className={styles.title}>Portfolio</h1>
            <header className={styles.header}>
                <ul className="nav">
                    {navbar.map((item, index) => {
                        if (router.pathname === item.link) {
                            return (
                                <li className={styles.li} key={index}>{item.name}</li>
                            );
                        } else {
                            return (
                                <li className={styles.li} key={index}><a className={styles.a} href={item.link}>{item.name}</a></li>
                            );
                        }
                    })}
                </ul>
            </header>
        </>
    );
    
    return page;
};

export default Header;