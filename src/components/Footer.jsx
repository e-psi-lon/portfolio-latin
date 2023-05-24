import React, { useEffect } from "react";
import styles from "../styles/index.module.css";

const Footer = () => {
    useEffect(() => {
        const updateFooterPosition = () => {
          const windowHeight = window.innerHeight;
          const contentHeight = document.body.scrollHeight;
    
          if (windowHeight >= contentHeight) {
            document.querySelector("footer").classList.remove("sticky-footer");
          } else {
            document.querySelector("footer").classList.add("sticky-footer");
          }
        };
    
        window.addEventListener("resize", updateFooterPosition);
        updateFooterPosition();
    
        return () => {
          window.removeEventListener("resize", updateFooterPosition);
        };
      }, []);
    return (
        <>
            <footer className={styles.footer}>
                <p className={styles.par}>Fait par Maulny Lilian 210 et 1G02</p>
            </footer>
        </>
    );
}

export default Footer;