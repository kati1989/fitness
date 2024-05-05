const express = require('express');
const db = require('../db');

const router = express.Router();

// Az összes felhasználó lekérdezése
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés végrehajtása közben: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Egy adott felhasználó lekérdezése az azonosítója alapján
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT * FROM users WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés végrehajtása közben: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Felhasználó nem található');
            return;
        }
        res.json(results[0]);
    });
});

// Felhasználó bejelentkeztetése
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Hiba történt a bejelentkezés közben.' });
        }
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Hibás felhasználónév vagy jelszó.' });
        }
        const user = results[0];
        return res.json({ success: true, message: 'Sikeres bejelentkezés.', user: user });
    });
});

// Elmenti a felhasználó adatait
// Felhasználó adatainak frissítése a megadott userId alapján
router.post('/update/:userId', (req, res) => {
    const userId = req.params.userId;
    const { first_name, last_name, birth_date } = req.body;

    const birthDate = new Date(birth_date).toISOString().slice(0, 19).replace('T', ' ');


    // Az SQL lekérdezés összeállítása
    const query = 'UPDATE users SET first_name = ?, last_name = ?, birth_date = ? WHERE id = ?';

    // A lekérdezés végrehajtása a db.query metódussal
    db.query(query, [first_name, last_name, birthDate, userId], (err, results) => {
        if (err) {
            // Hiba esetén küldünk egy hibaüzenetet
            console.error('Hiba történt a felhasználó adatainak frissítése közben:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Sikeres módosítás esetén visszaküldjük az eredményt
        res.json({ success: true, message: 'Felhasználó adatainak frissítése sikeres.' });
    });
});

module.exports = router;