const express = require('express');

const supplyRouter = express.Router();

supplyRouter.get('/supply');

supplyRouter.post('/supplies/:supply');

module.exports = { supplyRouter };