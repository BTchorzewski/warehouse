const { Types } = require('mongoose');
const Warehouse = require('../models/warehouse');
const { SUPPLIES } = require('../utilities/constants');

const getWarehousePage = async (req, res) => {
  const c400 = SUPPLIES.filter((el) => el.printer === 'Xerox_VersaLink_C400');
  const c605 = SUPPLIES.filter((el) => el.printer === 'Xerox_VersaLink_C605');
  const c8035 = SUPPLIES.filter((el) => el.printer === 'Xerox_AltaLink_C8035');

  const counts = [];
  for (const supply of SUPPLIES) {
    const count = await Warehouse.find().and([{ code: supply.code }, { available: true }]).count();
    counts.push({
      code: supply.code,
      count,
    });
  }

  // @todo write function to filter supplies for each printer.
  res.render('pages/warehouse/admin', {
    c400,
    c605,
    c8035,
    counts,
  });
};

const addSupply = async (req, res) => {
  const { code, quantity } = req.body;

  // @todo add to validation range of quantity 1-40.
  for (let i = 0; i < quantity; i++) {
    const newSup = new Warehouse({ code });
    await newSup.save();
  }
  // @todo add communicat about completed task.

  res.redirect('/warehouse');
};

const removeSupply = async (req, res) => {
  const { code, quantity } = req.body;
  for (let i = 0; i < quantity; i++) {
    // @todo add validation: cant remove more than is in warehaus.
    // @todo add validation: cant remove more than 40.
    // @todo add communicat about completed task.
    await Warehouse.findOneAndDelete({ available: true, code });
  }

  res.redirect('/warehouse');
};

module.exports = {
  getWarehousePage,
  addSupply,
  removeSupply,
};
