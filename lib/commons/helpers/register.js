/* eslint-disable max-len */
const mainIdentificationLine = (copybookName) => `       05  ${copybookName.toUpperCase()}-REGISTER.\n`;
const headerLine = (copybookName, fieldName) => `           10 ${copybookName.toUpperCase()}-${fieldName.toUpperCase()}.\n`;
const headerRedefinedLine = (copybookName, fieldName, redefinedField) => `           10 ${copybookName.toUpperCase()}-${fieldName.toUpperCase()}\n              REDEFINES ${copybookName.toUpperCase()}-${redefinedField.toUpperCase()}.\n`;
const inputOutputLine = (copybookName, fieldTypeDesc, fieldName, picType, size) => `              15 ${copybookName.toUpperCase()}-${fieldTypeDesc.toUpperCase()}-${fieldName.toUpperCase().padEnd(27)}PIC ${picType}(${size}).\n`;
const inputOutputDecimalLine = (copybookName, fieldTypeDesc, fieldName, picType, size, decimal) => `              15 ${copybookName.toUpperCase()}-${fieldTypeDesc.toUpperCase()}-${fieldName.toUpperCase().padEnd(27)}PIC ${picType}(${size})V${decimal}.\n`;
const fillerLine = (size) => `              15 FILLER                                PIC X(${size}).\n`;

const register = {
  mainIdentificationLine,
  headerLine,
  headerRedefinedLine,
  inputOutputLine,
  inputOutputDecimalLine,
  fillerLine
};

module.exports = { register };
