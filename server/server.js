const app = require('express')();
// const express = require('express');
const index = require('../db/index');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/products', (req, res) => {
  index.products((result) => res.send(result));
  // res.send('Hello World');
});

app.get('/products/:product_id', (req, res) => {
  index.product(req.params.product_id, (results) => res.send(results));
});

app.get('/products/:product_id/styles', (req, res) => {
  index.styles(req.params.product_id, (results) => res.send(results));
});

app.get('/products/:product_id/related', (req, res) => {
  index.related(req.params.product_id, (results) => res.send(results));
});

// eslint-disable-next-line no-console
app.listen(3000, console.log('Listening on Port 3000!'));
