const { logger } = require('../commons/logger');
const { createService } = require('../services');

class CreateController {
  async handle(req, res) {
    try {
      const { body } = req;
      const cpy = createService.copybook(body);

      return res
        .set('Content-type', 'application/json; charset=utf-8')
        .status(200)
        .send(cpy);
    } catch (error) {
      logger.error(
        'Error executing #handle on CreateController. ErrorMessage: %s',
        JSON.stringify(error, ['message', 'stack'])
      );

      return res.status(500).send({ error: error.message });
    }
  }
}

module.exports = { CreateController };
