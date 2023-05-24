import React from "react";
import BlaguesAPI from "blagues-api";
const blaguesAPI = new BlaguesAPI('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzA4MDA2NDc4ODA3Njk1NDUwIiwibGltaXQiOjEwMCwia2V5IjoidEF6V0hwRXphNWtZU0ExSlJQdkJzWElMVVRwSjlIMVYxMlN2QTdNN3c1eEJQNmwzTEMiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0yOFQxNDoyODoyNyswMDowMCIsImlhdCI6MTY3NDkxNjEwN30.nxUOr5o2MYXub4YtSGgr3JyJP9UKt3wDAE-QTLJDAxQ');

const getRandJoke = async () => {
    document.getElementById("blague-text").innerHTML = "Chargement...";
    document.getElementById("blague-answer").innerHTML = "";
    document.getElementById("blague-id").innerHTML = "";
    document.getElementById("blague-type").innerHTML = "";
    const blague = await blaguesAPI.random();
    document.getElementById("blague-text").innerHTML = blague.joke;
    document.getElementById("blague-answer").innerHTML = blague.answer;
    document.getElementById("blague-id").innerHTML = blague.id;
    document.getElementById("blague-type").innerHTML = blague.type;
}

const Blagues = () => {
    return (
        <>
            <button onClick={getRandJoke}>Blague</button>
            <div>
                <p>Blague : </p>
                <p id="blague-text"></p>
            </div>
            <div>
                <p>Réponse : </p>
                <p id="blague-answer"></p>
            </div>
            <div>
                <p>Id : </p>
                <p id="blague-id"></p>
            </div>
            <div>
                <p>Type : </p>
                <p id="blague-type"></p>
            </div>
        </>
    );
}

export default Blagues;