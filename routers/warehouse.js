const express = require('express');

const warehouseRouter = express.Router();

const { getWarehousePage, addSupply, removeSupply } = require('../controllers/warehouse');

warehouseRouter.get('/warehouse', getWarehousePage);

warehouseRouter.post('/add-supply', addSupply);
warehouseRouter.post('/remove-supply', removeSupply);

module.exports = { warehouseRouter };