const { Schema, model } = require('mongoose');

const supplyWarehouseSchema = Schema({
  code: {
    type: Schema.Types.ObjectId,
    ref: 'supplies',
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

module.exports = model('warehouse', supplyWarehouseSchema);