const { buildIdentificationPayload } = require('./identification');
const { buildCommentsPayload } = require('./comments');
const { buildRegisterPayload } = require('./register');

const builder = {
  identification: buildIdentificationPayload,
  comments: buildCommentsPayload,
  register: buildRegisterPayload
};

module.exports = { builder };
