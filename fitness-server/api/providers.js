const express = require('express');
const db = require('../db');

const router = express.Router();

// Az összes szolgáltató lekérdezése
router.get('/', (req, res) => {
    const query = 'SELECT * FROM providers';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés végrehajtása közben: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Egy adott szolgáltató lekérdezése az azonosítója alapján
router.get('/:providerId', (req, res) => {
    const providerId = req.params.providerId;

    const query = 'SELECT * FROM providers WHERE id = ?';

    db.query(query, [providerId], (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés végrehajtása közben: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Szolgáltató nem található');
            return;
        }
        res.json(results[0]);
    });
});

module.exports = router;