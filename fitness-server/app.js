const express = require('express');
const usersRouter = require('./api/users');
const subscriptionsRouter = require('./api/subscriptions');
const providersRouter = require('./api/providers');
const classesRouter = require('./api/classes');


const cors = require('cors'); // Importáld a cors modult

const app = express();

app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/providers', providersRouter);
app.use('/api/classes', classesRouter);

app.listen(3000, () => {
    console.log('A szerver fut a 3000-es porton.');
});
