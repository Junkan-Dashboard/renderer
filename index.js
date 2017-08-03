"use strict"

const express = require('express');
const HTTPStatus = require('http-status-codes');

var scraper = require('./app/routes/scraper');

const app = express();

// This middleware will be executed for every request to the app
// The api produces application/json only
app.use(function (req, res, next) {
  res.header('Content-Type','application/json');
  res.header('Content-Language', 'en');
  next();
});

app.use('/', scraper);

// Final catch any route middleware used to raise 404
app.get('*', (req, res, next) => {
  const err = new Error();
  err.statusCode = HTTPStatus.NOT_FOUND;
  next(err);
});

// Error response handler
app.use((err, req, res, next) => {
  res.status(err.statusCode);
  err.message = err.message || HTTPStatus.getStatusText(err.statusCode);
  res.send(
    {
      type: 'about:blank',
      title: err.message
    }
  );
});

app.listen(3000, function () {
    console.log('Junkan server is running on port 3000!');
});

module.exports = app;
