const express = require('express');
const db = require('../db');

const router = express.Router();

// Az összes óratípus lekérdezése
router.get('/', (req, res) => {
    const query = 'SELECT * FROM classes';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés végrehajtása közben: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Egy adott óratípus lekérdezése az azonosítója alapján
router.get('/:classId', (req, res) => {
    const classId = req.params.classId;

    const query = 'SELECT * FROM classes WHERE id = ?';

    db.query(query, [classId], (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés végrehajtása közben: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Óratípus nem található');
            return;
        }
        res.json(results[0]);
    });
});

// Az óratípusok lekérdezése oktatók szerint
router.get('/instructor/:instructorId', (req, res) => {
    const instructorId = req.params.instructorId;

    const query = `
        SELECT 
            c.*
        FROM 
            classes c
        JOIN 
            users u ON c.instructor_id = u.id
        WHERE 
            u.id = ?
    `;

    db.query(query, [instructorId], (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés végrehajtása közben: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;