// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connection, connect } = require('./db');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes'); // Bejelentkezés és regisztráció
const userRoutes = require('./routes/userRoutes'); // Felhasználói funkciók

const app = express();
const PORT = process.env.PORT || 3000;

// EJS templating engine beállítása
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/ejs'));

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Session beállítása kezdeti ertekekkel
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

// Adatbázis kapcsolat tesztelése és indítása
connect().then(() => {
    app.use('/', authRoutes);  // Bejelentkezés és regisztráció útvonalai
    app.use('/users', userRoutes);   // Felhasználói útvonalak

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
