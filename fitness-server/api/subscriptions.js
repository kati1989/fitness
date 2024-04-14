const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT 
            c.class_name,
            ts.start_time,
            ts.end_time
        FROM 
            users u
        JOIN 
            reservations r ON u.id = r.user_id
        JOIN 
            timeslots ts ON r.timeslot_id = ts.id
        JOIN 
            classes c ON ts.class_id = c.id
        WHERE 
            u.id = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés végrehajtása közben: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
