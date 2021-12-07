const Printer = require('../models/printer');
const { isMultifunctionalPrinter } = require('../utilities/utilities');

const getPrintersPage = async (req, res) => {
  let printers;
  try {
    printers = await Printer.find().lean();
  } catch (e) {
    throw new Error('DB error');
  }
  res.render('pages/printers/printers', { printers });
};

const getPrinterPage = async (req, res) => {
  const { printerId } = req.params;
  try {
    const printer = await Printer.findById(printerId).lean();
    if (!printer) throw new Error('a printer not found');
    res.render('pages/printers/printer', { printer });
  } catch (e) {
    res.send(`Something wrong: ${e}`);
  }
};

const createPrinterPage = (req, res) => {
  res.render('pages/printers/create-printer-page');
};

const createPrinter = async (req, res) => {
  const {
    title,
    ip,
    model,
    location,
  } = req.body;

  const newPrinter = new Printer({
    title,
    ip,
    model,
    location,
    multifunctional: isMultifunctionalPrinter(model),
  });

  try {
    const p = await newPrinter.save();
    console.log('printer saved', p);
    res.redirect('/printers');
  } catch (e) {
    console.log('something wrong', e);
  }
};

const updatePrinterPage = async (req, res) => {
  const { printerId } = req.params;
  const printer = await Printer.findById(printerId).lean();
  if (!printer) {
    throw new Error('A printer not found.');
  }
  console.log(printer);
  res.render('pages/printers/update-printer-page', { printer });
};

const updatePrinter = async (req, res) => {
  const {
    printerId,
    title,
    ip,
    typeOfPrinter,
    location,
  } = req.body;

  try {
    await Printer.findByIdAndUpdate(printerId, {
      title,
      ip,
      typeOfPrinter,
      location,
      multifunctional: isMultifunctionalPrinter(typeOfPrinter),
    });
    console.log('printer updated');
    res.redirect(`/printers/${printerId}`);
  } catch (e) {
    console.log('something wrong', e);
  }
};

const deletePrinter = async (req, res) => {
  const { printerId } = req.params;
  await Printer.findByIdAndDelete(printerId);
  res.redirect('/printers');
};

module.exports = {
  getPrinterPage,
  getPrintersPage,
  createPrinterPage,
  createPrinter,
  updatePrinterPage,
  updatePrinter,
  deletePrinter,
};