const express = require('express');
const mysql = require('mysql');
const cors = require('cors')


// Express alkalmazás létrehozása
const app = express();
app.use(cors(  ));

// Adatbázis konfiguráció
const connection = mysql.createConnection({
    host: 'localhost', // Az adatbázis szerver elérése
    user: 'root', // Felhasználónév
    password: 'root', // Jelszó
    database: 'fitness_db' // Adatbázis név
});

// Kapcsolat létrehozása
connection.connect((err) => {
    if (err) {
        console.error('Hiba a kapcsolat létrehozása során: ' + err.stack);
        return;
    }

    console.log('Kapcsolat létrehozva az ID-vel ' + connection.threadId);
});

// Példa lekérdezés futtatása
// connection.query('SELECT * FROM users', (error, results, fields) => {
//     if (error) throw error;
//     console.log('A felhasználók:', results);
// });

// GET endpoint a felhasználók lekérdezéséhez
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            console.error('Hiba a lekérdezés során: ' + error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Szerver figyelése a 3000-es porton
app.listen(3000, () => {
    console.log('A szerver fut a 3000-es porton');
});

