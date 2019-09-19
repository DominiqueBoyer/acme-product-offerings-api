const express = require('express');
const { syncAndSeed, models } = require('./db');
const { Product, Company, Offering } = models;

const app = express();

syncAndSeed()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  });
