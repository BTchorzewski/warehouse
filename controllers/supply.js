const Supply = require('../models/supply');

const getSupplyPage = (req, res) => {
  res.render('pages/supplies/main-supplies');
};

const addSupply = async (req, res) => {
  const { code, quantity } = req.body;
  // @todo add to validation range of quantity 1-40.
  for (let i = 0; i < quantity; i++) {
    const newSup = new Supply({ code });
    await newSup.save();
  }
  // @todo add communicat about completed task.
  res.render('pages/supplies/main-supplies');
};

const removeSupply = async (req, res) => {
  const { code, quantity } = req.body;
  for (let i = 0; i < quantity; i++) {
    // @todo add validation: cant remove more than is in warehaus.
    // @todo add validation: cant remove more than 40.
    // @todo add communicat about completed task.
    const del = await Supply.findOneAndDelete({ available: true, code });
    console.log(del);
  }
  res.json({ msg: 'ok' });
};

module.exports = {
  getSupplyPage,
  addSupply,
  removeSupply,
};
