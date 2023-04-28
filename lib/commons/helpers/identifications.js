const bookNameLine = (name) => `      *    BOOKNAME...: ${name.toUpperCase().padEnd(46)} *\n`;
const descriptionLine = (desc) => `      *    DESCRIPTION: ${desc.toUpperCase().padEnd(46)} *\n`;
const dateLine = (date) => `      *    DATE.......: ${date.toString().padEnd(46)} *\n`;
const authorLine = (author) => `      *    AUTHOR.....: ${author.toUpperCase().padEnd(46)} *\n`;
const sizeLine = (size) => `      *    SIZE.......: ${size.toString().padEnd(46)} *\n`;

const identifications = {
  bookNameLine,
  descriptionLine,
  dateLine,
  authorLine,
  sizeLine
};

module.exports = { identifications };
