const { commons } = require('../commons/helpers/commons');
const { identifications } = require('../commons/helpers/identifications');

const buildIdentificationPayload = (name, description, size, date, author) => {
  let identificationContent;
  identificationContent = commons.fullAsteriskLine();
  identificationContent += commons.asteriskSpacedLine();
  identificationContent += identifications.bookNameLine(name);
  identificationContent += identifications.descriptionLine(description);
  identificationContent += identifications.dateLine(date);
  identificationContent += identifications.authorLine(author);
  identificationContent += identifications.sizeLine(size);
  identificationContent += commons.asteriskSpacedLine();

  return identificationContent;
};

module.exports = { buildIdentificationPayload };
