const mysql = require('mysql');

// Adatbázis konfiguráció
const connection = mysql.createConnection({
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

module.exports = connection;
