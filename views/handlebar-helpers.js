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
  'format-price': price => price.toFixed(2),
  'isInArray': (array, elem) => !array.includes(elem),
};

module.exports = { handlebarHelpers };