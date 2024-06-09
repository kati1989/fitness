const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connection, connect } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Pug templating engine beállítása
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/pug'));

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Adatbázis kapcsolat tesztelése és indítása
connect().then(() => {
    // Felhasználók listázása
    app.get('/users', (req, res) => {
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
    app.get('/users/edit/:id', (req, res) => {
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

    // Felhasználó szerkesztés mentése
    app.post('/users/edit/:id', (req, res) => {
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

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
