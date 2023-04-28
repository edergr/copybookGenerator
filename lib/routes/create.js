const { createController } = require('../controllers');
const validateSchema = require('../validations');

module.exports = (router) => {
  router.post('/create', validateSchema.copybook, (req, res) => createController.handle(req, res));
};
