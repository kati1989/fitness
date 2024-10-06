// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { connection } = require('../db');

// Bejelentkezési oldal megjelenítése
router.get('/login', (req, res) => {
    res.render('viewLogin'); // A login.ejs sablon megjelenítése
});

// Bejelentkezési adatok feldolgozása
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    connection.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Hiba:', error);
            return res.status(500).send('Hiba történt a bejelentkezés során');
        }
        if (results.length > 0) {
            req.session.userId = results[0].id; // Felhasználó azonosítójának tárolása session-ben
            res.redirect(`/users/profile/${results[0].id}`);
        } else {
            res.status(401).send('Hibás felhasználónév vagy jelszó');
        }
    });
});

// Regisztrációs oldal megjelenítése
router.get('/register', (req, res) => {
    res.render('registration'); // Itt 'registration' a regisztrációs űrlapot tartalmazó EJS fájl neve
});

// Regisztrációs adatok feldolgozása
router.post('/register', (req, res) => {
    const { username, first_name, last_name, birth_date, password, confirm_password } = req.body;

    // Ellenőrizd, hogy a jelszavak egyeznek
    if (password !== confirm_password) {
        return res.status(400).send('A jelszavak nem egyeznek!');
    }

    // Adatok mentése az adatbázisba
    const query = 'INSERT INTO users (username, first_name, last_name, birth_date, password) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [username, first_name, last_name, birth_date, password], (error, results) => {
        if (error) {
            console.error('Hiba:', error);
            return res.status(500).send('Hiba történt a regisztráció során');
        }

        // Az új felhasználó azonosítójának tárolása session-ben
        req.session.userId = results.insertId; // Az új felhasználó ID-ja
        // Navigálás a profil oldalra
        res.redirect(`/users/profile/${results.insertId}`);
    });
});

module.exports = router;
