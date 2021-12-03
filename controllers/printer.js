const Printer = require('../models/printer');


const savePrinter = async (req, res) => {
  const {
    title,
    ip,
    typeOfPrinter,
    multifunctional,
    location,
  } = req.body;
  console.log()
  const newPrinter = new Printer({
    title,
    ip,
    typeOfPrinter,
    multifunctional,
    location,
  });
  try {
    const p = await newPrinter.save();
    console.log('printer saved', p);
    res.redirect('/');
  } catch (e) {
    console.log('something wrong', e);
  }
};

module.exports = {
  savePrinter,
};