import React from "react";
import "./Dashboard.css";
import firebaseConfig from "../../config/FireBase";

export default function Dashboard() {

    return (
        <div className="Dashboard">
        <h1>Hlavni menu</h1>
            <button onClick={() => firebaseConfig.auth().signOut()}>Odhlasit se</button>
        </div>
    )
}

