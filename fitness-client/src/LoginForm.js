import React, { useState } from 'react';
import axios from 'axios';
import './css/loginForm.css'; // CSS fájl importálása

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            // A bejelentkezéshez szükséges adatok elküldése az API-nak
            const response = await axios.post('http://localhost:3001/api/users/login', { username, password });

            // A válasz ellenőrzése: ha a bejelentkezés sikeres, hívjuk meg az onLogin callback függvényt
            if (response.data.success) {
                onLogin();
            } else {
                setErrorMessage(response.data.message); // Hibauzenet beallitasa
            }
        } catch (error) {
            console.error('Hiba történt a bejelentkezés közben:', error); // Hibakezelés: loggoljuk a hibát
            setErrorMessage('Hiba történt a bejelentkezés közben.'); // Hibauzenet beallitasa
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center">Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Felhasználónév:</label>
                            <input id="username" type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Jelszó:</label>
                            <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;
