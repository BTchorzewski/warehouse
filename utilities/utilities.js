function isMultifunctionalPrinter(printer) {
  switch (printer) {
    case 'Xerox_AltaLink_C8035':
      return true;
    case 'Xerox_VersaLink_C605':
      return true;
    case 'Xerox_VersaLink_C400':
      return false;
    default:
      throw new Error('Invalid param - unrecognized printer');
  }
}

module.exports = {
  isMultifunctionalPrinter,
};