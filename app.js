const express = require('express');
const path = require('path');
const magicMoverRouter = require('./routes/magicMoverRoutes');
const magicItemRouter = require('./routes/magicItemsRoutes');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/task', magicItemRouter, magicMoverRouter);
module.exports = app;