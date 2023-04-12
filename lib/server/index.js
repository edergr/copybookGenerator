const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { logger } = require('../commons/logger');
const config = require('../conf');
const pkg = require('../../package.json');
const { create } = require('../routes');

const server = (() => {
  const router = new express.Router();
  const app = express();
  const env = process.env.NODE_ENV;
  let serverProcess;

  const configServer = () => {
    create(router);

    app.set('port', config.get('PORT'));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use('/', router);

    return app;
  };

  const start = () => new Promise((resolve) => {
    configServer();
    serverProcess = app.listen(app.get('port'), () => {
      logger.info('------------------------------------------------------------------');
      logger.info(`${pkg.name} - Version: ${pkg.version}`);
      logger.info(`ATTENTION, ${env} ENVIRONMENT!`);
      logger.info(`Listening on port: ${serverProcess.address().port}`);
      logger.info('------------------------------------------------------------------');

      return resolve(app);
    });
  });

  const stop = () => new Promise((resolve, reject) => {
    if (serverProcess) {
      serverProcess.close((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    }
  });

  return {
    configServer,
    start,
    stop
  };
})();

module.exports = server;
