/* eslint-disable max-len */
const commentDescriptionLine = (type, name, desc) => `      *    ${type}-${name.toUpperCase().padEnd(21, '.')}: ${desc.toUpperCase().padEnd(34)} *\n`;


const comments = {
  commentDescriptionLine
};

module.exports = { comments };
