const express = require('express');

const printerRouter = express.Router();
const {savePrinter} = require('../controllers/printer');

printerRouter.get('/printers');

printerRouter.post('/printers', savePrinter);


module.exports = {
  printerRouter,
};