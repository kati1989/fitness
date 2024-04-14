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

module.exports = router;
