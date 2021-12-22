const Printer = require('../models/printer');

const Warehouse = require('../models/warehouse');

const { SUPPLIES } = require('../utilities/constants');

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

    const suppliesForPrinter = SUPPLIES.filter((supply) => supply.printer === printer.model);
    console.log('start loop')
    for (const suppliesForPrinterKey of suppliesForPrinter) {
      const available = await Warehouse.find({ $and: [{ code: suppliesForPrinterKey.code }, { available: true }] }).count();
      suppliesForPrinterKey.av = !available;
      console.log('inside loop',suppliesForPrinterKey)
    }
    console.log(suppliesForPrinter);
    console.log('end loop')
    //@todo disable add button if supply in not available.
    res.render('pages/printers/printer', { printer, suppliesForPrinter });
  } catch (e) {
    res.send(`Something wrong: ${e}`);
  }
};

const supplyPrinter = async (req, res) => {
  const { printerId, code } = req.body;
  try {
    const availableSupply = await Warehouse.findOne({ $and: [{ code }, { available: true }] });
    const printer = await Printer.findById(printerId);

    if (availableSupply === null || printer === null) {
      throw new Error('Printer or supply not find');
    }

    printer.history.push(printer._id);
    availableSupply.dateOutAt = new Date().toDateString();
    availableSupply.installedIn = printer._id;

    await printer.save();
    await availableSupply.save();
    res.redirect('/printers');
  } catch (e) {
    // @todo add error page.
    console.log('Ups somethig wrong in supply printer', e);
    res.redirect('/');
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
    model,
    location,
  } = req.body;

  try {
    await Printer.findByIdAndUpdate(printerId, {
      title,
      ip,
      model,
      location,
      multifunctional: isMultifunctionalPrinter(model),
    });
    console.log('printer updated');
    res.redirect('/printers');
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
  supplyPrinter,
  createPrinterPage,
  createPrinter,
  updatePrinterPage,
  updatePrinter,
  deletePrinter,
};