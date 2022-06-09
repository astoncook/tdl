const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const connect = require('./db/connect');
const axios = require("axios");
var cors = require("cors");
const dotenv = require('dotenv');

const CLIENT_ID = "9ca06cc9db47d03ed4f5";
const CLIENT_SECRET = "3eaae5cf5a3a59f3da377ab835ee83f170eb5e5e";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

connect.initDb();

app.get("/toDo/oauth-callback", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.redirect(
      `http://localhost:8080?access_token=${response.data.access_token}`
    );
  });
});


app
    .use(bodyParser.json())
    .use('/', require('./routes'))
    .use(cors({ credentials: true, origin: true }));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
