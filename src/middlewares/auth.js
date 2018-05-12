const logger = require('../api/utils/logger');
const appConfig = require('../config/config').app;
const STATUS = require('http-status-codes');

/**
 * Middleware for authorising requests (swagger mw , not express mw)
 * Checks if appKey is Valid
 * Check origins whitelist if this options is enabled
 */
module.exports = (req, authOrSecDef, scopesOrApiKey, cb) => {
  const { appKey } = req.query;

  if (appKey === undefined) {
    cb(new Error('appKey is not present'));
  } else {
    applicationService.getApplication(appKey).then((app) => {
      if (app) {
        req.applicationObject = app;
        if (whitelist(req)) {
          cb(null);
        } else {
          cb(new Error('Access not allowed'));
        }
      } else {
        // overriding with an extra data properties on
        // api/fittings/errorFitting.js file for 401/unauthorized
        const err = new Error('data');
        err.statusCode = STATUS.UNAUTHORIZED;
        err.message = 'Not valid appKey';
        err.data = appConfig.applicationDefaultConfig.default;
        cb(err);
      }
    }).catch((error) => {
      logger.error({ type: 'ERROR', message: error.message });
      const err = new Error('Internal server error');
      err.statusCode = 500;
      cb(err);
    });
  }
};
