import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // function validateForm() {
    //     return username.length > 0 && password.length > 0;
    // }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit}>


                <FormGroup controlId="username" bsSize="large">

                    <FormControl
                        autoFocus
                        type="username"
                        placeholder="Uživatelské jméno"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">

                    <FormControl
                        value={password}
                        placeholder="Heslo"
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" type="submit">
                    Přihlásit se
                </Button>
            </form>
        </div>
    );
}