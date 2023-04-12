const { logger } = require('../commons/logger');
const { InternalError } = require('../errors');
const { builder } = require('../builder');

class CreateService {
  copybook(input) {
    try {
      const {
        name, description, size, date, author,
        header, body, trailer
      } = input;

      let copybook;
      copybook = builder.identification(name, description, size, date, author);
      copybook += builder.comments(header, body, trailer);
      copybook += builder.register(name, header, body, trailer);

      return copybook;
    } catch (error) {
      logger.error(
        'Error executing #copybook on CreateService. Input: %o. ErrorMessage: %s',
        input,
        JSON.stringify(error, ['message', 'stack'])
      );
      throw new InternalError('Internal Error', error);
    }
  }
}

module.exports = { CreateService };
