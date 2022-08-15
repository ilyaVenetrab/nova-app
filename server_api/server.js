const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('./models/db');

const app = express();
const indexAPI = require('./routes');

// app.use(bodyParser.json());
app.use(cors({
  // TODO:should use as secret environment variable
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'bezkoder-session',
    // TODO:should use as secret environment variable
    secret: 'COOKIE_SECRET',
    httpOnly: true
  })
);
// app.use(cors());

app.use(express.static(path.join(__dirname, '../dist/novardis')));
app.use('/', express.static(path.join(__dirname, '../dist/novardis/index.html')));

app.use('/api', indexAPI);
// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// Find 404 and hand over to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, _req, res, _next) {
  // Log error message in our server's console
  console.error('err => ', err.message);
  // If err has no specified error code, set error code to 'Internal Server Error (500)'
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  // All HTTP requests must have a response, so let's send back an error with its status code and message
  res.status(err.statusCode).send(err.message);
});
