const { Schema, model } = require('mongoose');
//@todo erease this model.
const supplyWarehouseSchema = Schema({
  code: {
    type: String,
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