const Warehouse = require('../models/warehouse');

const validMaxNumberItemsToAdd = (param) => {

  if (param > 10) throw new Error('Can\'t add more than 10 items');

}

module.exports = {
  validMaxNumberItemsToAdd,
}