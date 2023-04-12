const { commons } = require('../commons/helpers/commons');
const { register } = require('../commons/helpers/register');

const buildRegisterPayload = (copybookName, header, body, trailler) => {
  let registerContent;
  registerContent = register.mainIdentificationLine(copybookName);
  registerContent += register.headerLine(copybookName, header.name);

  header.fields.forEach((field) => {
    if (!field.filler) {
      registerContent += register.inputOutputLine(copybookName, 'H', field.name, field.type, field.size);
    } else {
      registerContent += register.fillerLine(field.size);
    }
  });

  body.forEach((group) => {
    registerContent += register.headerRedefinedLine(copybookName, group.name, group.redefines);
    group.fields.forEach((field) => {
      if (!field.filler) {
        if (field.decimal) {
          const decimal = '9';
          registerContent += register.inputOutputDecimalLine(
            copybookName, field.inOut, field.name, field.type, field.size, decimal.padEnd(field.decimal, '9')
          );
        } else {
          registerContent += register.inputOutputLine(
            copybookName, field.inOut, field.name, field.type, field.size
          );
        }
      } else {
        registerContent += register.fillerLine(field.size);
      }
    });
  });

  if (trailler) {

  }

  registerContent += commons.asteriskSpacedLine();
  registerContent += commons.fullAsteriskLine();

  return registerContent;
};

module.exports = { buildRegisterPayload };
