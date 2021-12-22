const { Types } = require('mongoose');
const Warehouse = require('../models/warehouse');
const { SUPPLIES } = require('../utilities/constants');
const {validationResult} = require('express-validator')

const getWarehousePage = async (req, res) => {
  const c400 = SUPPLIES.filter((el) => el.printer === 'Xerox_VersaLink_C400');
  const c605 = SUPPLIES.filter((el) => el.printer === 'Xerox_VersaLink_C605');
  const c8035 = SUPPLIES.filter((el) => el.printer === 'Xerox_AltaLink_C8035');


  const err = validationResult(req).array();
  console.log(err);
  const counts = [];
  for (const supply of SUPPLIES) {
    const count = await Warehouse.find().and([{ code: supply.code }, { available: true }]).count();
    counts.push({
      code: supply.code,
      count,
    });
  }

  res.render('pages/warehouse/admin', {
    c400,
    c605,
    c8035,
    counts,
  });
};

const addSupply = async (req, res) => {
  const { code, quantity } = req.body;
  const err = validationResult(req).array();
  console.log(err);
  for (let i = 0; i < quantity; i++) {
    const newSup = new Warehouse({ code });
    await newSup.save();
  }

  res.redirect('/warehouse');
};

const removeSupply = async (req, res) => {
  const { code, quantity } = req.body;
  try {
    const numberAvailableSupplies = await Warehouse.find({ available: true, code }).count();
    //@todo move validation outside the controller.
    if (quantity < 20) throw new Error('Can\'t remove more than 20 items');

    if (numberAvailableSupplies < quantity) throw new Error('the quantity is higher than amount of available items.');

    for (let i = 0; i < quantity; i++) {
      // @todo add communicat about completed task.
      await Warehouse.findOneAndDelete({ available: true, code });
    }
  } catch (e) {
    console.log(e.message);
    const error = { msg: e.message };
    res.render('pages/warehouse/admin', error);
  }
};

module.exports = {
  getWarehousePage,
  addSupply,
  removeSupply,
};
