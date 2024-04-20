const express = require('express');
const usersRouter = require('./api/users');
const subscriptionsRouter = require('./api/subscriptions');
const providersRouter = require('./api/providers');
const classesRouter = require('./api/classes');


const cors = require('cors'); // Importáld a cors modult

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/providers', providersRouter);
app.use('/api/classes', classesRouter);

app.listen(3001, () => {
    console.log('A szerver fut a 3001-es porton.');
});
