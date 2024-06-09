const mysql = require('mysql');

// Adatbázis konfiguráció
const connection = mysql.createConnection({
    user: 'root', // Felhasználónév
    password: 'root', // Jelszó
    database: 'fitness_db' // Adatbázis név
});

// Kapcsolat létrehozása
const connect = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Hiba a kapcsolat létrehozása során: ' + err.stack);
                reject(err);
            } else {
                console.log('Kapcsolat létrehozva az ID-vel ' + connection.threadId);
                resolve();
            }
        });
    });
};

module.exports = {connection, connect};
