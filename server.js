const express = require('express');
const { syncAndSeed } = require('./db');

const app = express();

app.use('/api', require('./api'));

syncAndSeed()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  });
