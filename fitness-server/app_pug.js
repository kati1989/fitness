// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { connect } = require('./db'); // Felteszem, hogy ez az adatbázis csatlakozási modul
const authRoutes = require('./routes/authRoutes'); // Bejelentkezés és regisztráció
const userRoutes = require('./routes/userRoutes'); // Felhasználói funkciók

const app = express();
const PORT = process.env.PORT || 3000;

// Pug templating engine beállítása
app.set('view engine', 'pug'); // Beállítjuk, hogy a .pug kiterjesztést használja
app.set('views', path.join(__dirname, 'views/pug')); // Pug nézetek helyének megadása

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Dátum formázás függvény
function formatDate(date) {
    const formattedDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '.');
    return formattedDate;
}

app.locals.formatDate = formatDate;

// Session beállítása kezdeti értékekkel
app.use(session({
    secret: 'secret-key', // Állítsd be egy erős titokra
    resave: false,
    saveUninitialized: false
}));

// Adatbázis kapcsolat tesztelése és indítása
connect().then(() => {
    app.use('/', authRoutes);  // Bejelentkezés és regisztráció útvonalai
    app.use('/users', userRoutes);   // Felhasználói útvonalak

    // Szerver indítása
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
