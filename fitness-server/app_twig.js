const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connect } = require('./db_nosql');  // Remove connection from the import
const twig = require('twig');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Twig templating engine setup
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views/twig'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection and server start
connect().then((db) => {  // Use the returned db object
    // List users
    app.get('/users', async (req, res) => {
        try {
            const users = await db.collection('users').find().toArray();
            res.render('usersList', { users });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error fetching users');
        }
    });

    // Edit user
    app.get('/users/edit/:id', async (req, res) => {
        try {
            const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.render('userEdit', { user });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error fetching user');
        }
    });

    // Save edited user
    app.post('/users/edit/:id', async (req, res) => {
        try {
            const { username, first_name, last_name, birth_date } = req.body;
            await db.collection('users').updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { username, first_name, last_name, birth_date } }
            );
            res.redirect('/users');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error saving user');
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
