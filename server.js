const express = require('express');
const path = require('path');
const { syncAndSeed } = require('./db');

const app = express();

app.use('/api', require('./api'));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, './index.html')))

syncAndSeed()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  });
