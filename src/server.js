const express = require('express');
const history = require('connect-history-api-fallback')
const path = require('path');
const helmet = require('helmet');
const app = express();
const PORT = 3000;
const port = process.env.PORT || PORT;

const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 1 * 10 * 1000,
    max: 200,
});

const limiter = rateLimit({
    windowMs: 1 * 10 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
})

const distPath = path.join(__dirname, '../', 'dist');

app.use(limiter)
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
        'default-src': [
            "'self'",
            'https://ya-praktikum.tech',
            'wss://ya-praktikum.tech',
            'ws://localhost:*',
            'https://fonts.gstatic.com',
            "'unsafe-inline'",
        ],
        'script-src': [
            "'self'",
            "'unsafe-eval'",
            "'sha256-76e59211187dd5d7e249ceafe9c45ee205997'",
        ],
    },
}));


app.use(history());
app.use(express.static(distPath));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
}); 