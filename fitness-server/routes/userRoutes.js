// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { connection } = require('../db');

// Felhasználók listázása
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Hiba:', error);
            return res.status(500).send('Hiba történt a felhasználók lekérdezésekor');
        }
        res.render('usersList', { users: results });
    });
});

// Felhasználó szerkesztése
router.get('/edit/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [req.params.id], (error, results) => {
        if (error) {
            console.error('Hiba:', error);
            return res.status(500).send('Hiba történt a felhasználó lekérdezésekor');
        }
        if (results.length === 0) {
            return res.status(404).send('Felhasználó nem található');
        }
        res.render('userEdit', { user: results[0] });
    });
});

// Felhasználó profilja
router.get('/profile/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [req.params.id], (error, results) => {
        if (error) {
            console.error('Hiba:', error);
            return res.status(500).send('Hiba történt a felhasználó lekérdezésekor');
        }
        if (results.length === 0) {
            return res.status(404).send('Felhasználó nem található');
        }
        res.render('profile', { user: results[0] });
    });
});

// Felhasználó szerkesztés mentése
router.post('/edit/:id', (req, res) => {
    const { username, first_name, last_name, birth_date } = req.body;
    const query = 'UPDATE users SET username = ?, first_name = ?, last_name = ?, birth_date = ? WHERE id = ?';
    connection.query(query, [username, first_name, last_name, birth_date, req.params.id], (error) => {
        if (error) {
            console.error('Hiba:', error);
            return res.status(500).send('Hiba történt a felhasználó mentésekor');
        }
        res.redirect('/users');
    });
});

module.exports = router;
