const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const connect = require('./db/connect');

connect.initDb();

app
    .use(bodyParser.json())
    .use('/', require('./routes'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
