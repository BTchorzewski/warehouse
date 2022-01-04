const express = require('express');

const { body } = require('express-validator');

const warehouseRouter = express.Router();

const { getWarehousePage, addSupply, removeSupply } = require('../controllers/warehouse');

const { validMaxNumberItemsToAdd } = require('../utilities/warehouse-router');

warehouseRouter.get('/warehouse', getWarehousePage);
// @todo change error msg.
warehouseRouter.post('/add-supply', body('quantity')
  .isInt({ max: 10 })
  .withMessage('Value must be number.'), addSupply);

// @todo add validation
warehouseRouter.post('/remove-supply', removeSupply);

module.exports = { warehouseRouter };