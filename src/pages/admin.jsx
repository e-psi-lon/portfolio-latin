import React, { useEffect, useState} from "react";
import styles from "@/src/styles/admin.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import * as edit from "@/src/components/edit";

const pathToComponent = {
    words: {
        id: "words",
        component: <edit.Words />
    },
    works: {
        id: "works",
        component: <edit.Works />
    }
}


const checkToken = async (token) => {
    try {
        const response = await axios.post("/api/checkToken", { token });
        if (response.status !== 200) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};



const Admin = () => {
    const router = useRouter();
    const [content, setContent] = useState(null);
    const [basecontent, setBaseContent] = useState(
        <>
            <h1 className={styles.subtitle}>Chargement...</h1>
        </>
    );
    
    useEffect(() => {
        const start = async (router) => {
            if (!router.query.token) {
                const token = localStorage.getItem("token");
                if (token) {
                    router.push(`/admin?token=${token}`);
                }
                else {
                    router.push("/connect");
                }
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
                        <li className={styles.action}
                            onClick={() => setContent(pathToComponent.words.component)}>
                            Mots
                        </li>
                        <li className={styles.action}
                            onClick={() => setContent(pathToComponent.works.component)}>
                            Travaux
                        </li>
                        <li className={styles.action}
                            onClick={() => router.push("/")}>
                            Retour
                        </li>
                        <li className={styles.action}
                            onClick={() => {
                                localStorage.removeItem("token");
                                router.push("/connect");
                            }}>
                            Déconnexion
                        </li>
                    </ul>
                </>
            );
        };
        start(router);
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
                {basecontent}
                {content}
            </div>
        </>
    )
}

export default Admin;