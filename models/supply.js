const { Schema, model } = require('mongoose');

const supplySchema = Schema({
  title: {
    type: String,
  },
  typeOfPrinter: {
    type: String,
  },
  dateInAt: {
    type: Date,
  },
  dateOutAt: {
    type: Date,
  },
  available: {
    type: Boolean,
  },
  printerIn: {
    type: Schema.Types.ObjectId,
    ref: 'printer',
  },
});

module.exports = model('supply', supplySchema);