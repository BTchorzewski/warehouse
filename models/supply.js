const { Schema, model } = require('mongoose');

const supplySchema = Schema({
  code: {
    type: String,
  },
  dateInAt: {
    type: Date,
    default: Date.now,
  },
  dateOutAt: {
    type: Date,
  },
  available: {
    type: Boolean,
    default: true,
  },
  installedIn: {
    type: Schema.Types.ObjectId,
    ref: 'printer',
  },
});

module.exports = model('supply', supplySchema);