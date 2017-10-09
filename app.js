'use strict';

const config = require('config');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const constant = require('./src/const/const');
const router = require('./src/router/router');

const app = express();

app.set('trust proxy', true);
app.set('etag', false);
app.disable('x-powered-by');


app.use(morgan('tiny', {
    skip: (req, res) => {
        return ['/_healthcheck', '/favicon.ico', '/apple-touch-icon.png'].indexOf(req.path) !== -1;
    },
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(bodyParser.json());


app.use(session({
    key: 'ba.sid',
    secret: '3[^[!1hS4/O2wd',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    res.set({
        'Prgama': 'no-cache',
        'Cache-Control': 'no-cache',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Frame-Options': 'DENY',
    });
    next();
});


// -----------------------------------------
// Routes
// -----------------------------------------
app.use(config.get(constant.BASE_PATH), router);

// -----------------------------------------
// 404 Middlewares
// -----------------------------------------
app.use((req, res, next) => {
    res.status(404).json({ ok: false, message: 'Not found' });
});

// -----------------------------------------
// Error Middlewares
// -----------------------------------------
app.use((err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ ok: false, message: 'Server Error' });
});

const server = app.listen(config.get(constant.PORT), () => {
    console.log(`Listening on port ${server.address().port}`);
});

module.exports = server;