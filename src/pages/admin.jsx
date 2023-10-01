import React, { useEffect, useState} from "react";
import styles from "@/src/styles/admin.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import * as edit from "@/src/components/edit";

const checkToken = async (token) => {
    try {
        const response = await axios.post("/api/checkToken", { token });
        return response.status === 200;

    } catch (error) {
        return false;
    }
};



const Admin = () => {
    const router = useRouter();
    const [content, setContent] = useState(null);
    const [baseContent, setBaseContent] = useState(
        <>
            <h1 className={styles.subtitle}>Chargement...</h1>
        </>
    );
    
    useEffect(() => {
        const start = async (router) => {
            if (!router.query.token) {
                const token = localStorage.getItem("token");
                if (token) router.push(`/admin?token=${token}`);
                else router.push("/connect");
                return;
            }
            const token = router.query.token;
            const tokenIsValid = await checkToken(token);
            if (!tokenIsValid) {
                router.push("/connect");
                return;
            }
            setBaseContent(
                <>
                    <h1 className={styles.title}>Admin</h1>
                    <ul className={styles.actions}>
                        <li className={styles.action}>
                            <button onClick={() => setContent(<edit.Words token={token}/>)} className={styles.actionButton}>Mots</button>
                        </li>
                        <li className={styles.action}>
                            <button onClick={() => setContent(<edit.Works token={token}/>)} className={styles.actionButton}>Travaux</button>
                        </li>
                        <li className={styles.action}>
                            <button onClick={() => router.push("/")} className={styles.actionButton}>Retour au site</button>
                        </li>
                        <li className={styles.action}>
                            <button onClick={() => {localStorage.removeItem("token"); router.push("/connect");}} className={styles.actionButton}>Déconnexion</button>
                        </li>
                    </ul>
                </>
            );
        };
        start(router).then(r => r);

    }, [router]);
    return (
        <>
            <Head>
                <title>Portfolio – Admin</title>
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
            <script>
            </script>
            <div className={styles.content}>
                {baseContent}
                {content}
            </div>
        </>
    )
}

export default Admin;