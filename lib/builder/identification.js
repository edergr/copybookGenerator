const { commons } = require('../commons/helpers/commons');
const { identifications } = require('../commons/helpers/identifications');

const buildIdentificationPayload = (name, description, size, date, author) => {
  let identificationContent;
  identificationContent = commons.fullAsteriskLine();
  identificationContent += commons.asteriskSpacedLine();
  identificationContent += identifications.bookNameLine(name);
  if (description) {
    identificationContent += identifications.descriptionLine(description);
  }
  if (date) {
    identificationContent += identifications.dateLine(date);
  }
  if (author) {
    identificationContent += identifications.authorLine(author);
  }
  if (size) {
    identificationContent += identifications.sizeLine(size);
  }
  identificationContent += commons.asteriskSpacedLine();

  return identificationContent;
};

module.exports = { buildIdentificationPayload };
