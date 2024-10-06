// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { connect } = require('./db'); // Felteszem, hogy ez az adatbázis csatlakozási modul
const authRoutes = require('./routes/authRoutes'); // Bejelentkezés és regisztráció
const userRoutes = require('./routes/userRoutes'); // Felhasználói funkciók
const nunjucks = require('nunjucks');

const app = express();
const PORT = process.env.PORT || 3000;

// Nunjucks templating engine beállítása
const env = nunjucks.configure(  path.resolve(__dirname,'views/nunjucks'), {
    autoescape: true,
    express: app,
    watch: true // Opció a sablonok automatikus újratöltéséhez fejlesztés alatt
});

// Egyedi dátum formázás filter hozzáadása
env.addFilter('formatDate', function(date) {
    const formattedDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '.');
    return formattedDate;
});

app.engine ('njk', nunjucks.render);



// Nunjucks beállítása, hogy a .njk fájlokat is felismerje
app.set('view engine', 'njk'); // Beállítjuk, hogy a .njk kiterjesztést használja

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

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
