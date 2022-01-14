const moment = require('moment');
const Warehouse = require('../models/warehouse');
const { SUPPLIES } = require('../utilities/constants');

const handlebarHelpers = {
  upper: (txt) => txt.toUpperCase(),
  'find-price': (entries, selectedItem) => {
    const result = entries.find((el) => el[0] === selectedItem);
    if (!result) {
      throw new Error('Can\'t find product');
    }
    const [, price] = result;
    return price;
  },
  'format-price': (price) => price.toFixed(2),
  isInArray: (array, elem) => !array.includes(elem),
  'get-quantity': (code, arr) => {
    const { count } = arr.find((el) => el.code === code);
    return count;
  },
  isZero: (code, arr) => {
    const { count } = arr.find((el) => el.code === code);
    return !(count > 0);
  },
  'get-info': (code) => {
    const result = SUPPLIES.filter((supply) => supply.code === code).pop();
    return result.supply;
  },
  'format-date': (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a'),
};

module.exports = { handlebarHelpers };