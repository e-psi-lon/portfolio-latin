import React, { useState, useEffect } from "react";
import styles from "@/src/styles/connect.module.css";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";



const Connect = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        event.preventDefault();
        setErrorMessage("");
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        try {
            const response = await axios.post("/api/login", { username, password });
            if (response.status !== 200) {
                setErrorMessage("Nom d'utilisateur ou mot de passe incorrect");
                return;
            }
            const token = response.data.token;
            localStorage.setItem("token", token);
            await router.push(`/admin?token=${token}`);
            
        } catch (error) {
            setErrorMessage("Nom d'utilisateur ou mot de passe incorrect");
        }
    };

    const load = () => {
        useEffect(() => {
            const token = localStorage.getItem("token");
            const check = async () => {
                try {
                    const response = await axios.post("/api/checkToken", { token });
                    if (response.status !== 200) {
                        localStorage.removeItem("token");
                        return false;
                    }   
                } catch (error) {
                    console.log(error);
                    localStorage.removeItem("token");
                    return false;
                }
                return true;
            };
            if (token) {
                const checked = check().then((result) => result);
                if (checked) {
                    router.push(`/admin?token=${token}`).then(r => r);
                }
            }
        }, []);
    };
    load()
    return (
        <>
            <Head>
                <title>Portfolio – Connect</title>
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
                <h1 className={styles.title}>Connexion</h1>
                <form className={styles.form} onSubmit={handleLogin} method="post">
                    <label htmlFor="username" className={styles.label}>Nom d'utilisateur :</label>
                    <input type="text" id="username" name="username" className={styles.input} value={username} onChange={(event) => setUsername(event.target.value)} />
                    <label htmlFor="password" className={styles.label}>Mot de passe :</label>
                    <input type="password" id="password" name="password" className={styles.input} value={password} onChange={(event) => setPassword(event.target.value)} />
                    <button type="submit" className={styles.submit}>Se connecter</button>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </form>
            </div>
        </>
    );
};

export default Connect;