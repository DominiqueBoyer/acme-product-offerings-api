const router = require('express').Router();
const path = require('path');
const { models } = require('./db');
const { Product, Company, Offering } = models;

module.exports = router;

router.get('/', (req, res, next) => res.sendFile(path.join(__dirname, './index.html')))

router.get('/products', (req, res, next) => {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});

router.get(('/companies'), (req, res, next) => {
  Company.findAll()
    .then( companies => res.send(companies) )
    .catch(next);
});

router.get('/offerings', (req, res, next) => {
  Offering.findAll()
    .then(offerings => res.send(offerings))
    .catch(next);
});


