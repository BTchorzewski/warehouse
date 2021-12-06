function isMultifunctionalPrinter(printer) {
  switch (printer) {
    case 'Xerox AltaLink C8035':
      return true;
    case 'Xerox VersaLink C605':
      return true;
    case 'Xerox VersaLink C400':
      return false;
    default:
      throw new Error('Invalid param - unrecognized printer');
  }
}

module.exports = {
  isMultifunctionalPrinter,
};