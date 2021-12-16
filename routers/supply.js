const express = require('express');

const supplyRouter = express.Router();

const { getSupplyPage, addSupply, removeSupply } = require('../controllers/supply');

supplyRouter.get('/supplies', getSupplyPage);

supplyRouter.post('/add-supply', addSupply);
supplyRouter.post('/remove-supply', removeSupply);

module.exports = { supplyRouter };