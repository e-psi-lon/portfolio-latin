import React, { useState } from "react";
import styles from "@/src/styles/admin.module.css";
import * as create from "@/src/components/dialog/create";

const Works = () => {
    const [dialog, setDialog] = useState(null);
    return (
        <>
            <div id="createWhat" className={styles.dialog}>
                {dialog}
                <ul>
                    <li><button onClick={() => setDialog(<create.CreateWhat />)}>Création</button></li>

                </ul>
            </div>
        </>
    );

}

export default Works;