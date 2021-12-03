const { Schema, model } = require('mongoose');

const printerSchema = Schema({
  title: {
    type: String,
  },
  ip: {
    type: String,
  },
  model: {
    type: String,
  },
  multifunctional: {
    type: Boolean,
  },
  area: {
    type: String,
  },
  location: {
    type: String,
  },
  history: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'supply',
      }
    ],
  },
});

module.exports = model('printer', printerSchema);