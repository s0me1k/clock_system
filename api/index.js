const cors = require("cors");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const headers = require('./middelware/headers')
const preflight = require('./middelware/preflight');

const app = express();

const port = 5000
const server = http.createServer(app);

// Routes
const apiRouter = require('./router');

app.use(cors());
app.use(headers);
app.use(preflight);
app.use(bodyParser.json());

app.use('/api', apiRouter);

server.listen(port, () => {
  console.log('app: ', port);
});