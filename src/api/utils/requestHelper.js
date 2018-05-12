const logger = require('../utils/logger');
const ip = require('../utils/ip');

/**
 * Helper for managing request
 */
class requestHelper {
  /**
   * Logs a request
   * @param {Request} req
   * @param {Object} payload
   */
  static log(req, payload = '') {
    const appKey = ''; //req.applicationObject.publicKey;
    const IP = ip(req);

    logger.info({
      type: 'REQUEST', method: req.method, path: req.originalUrl, payload, appKey, IP,
    });
  }
}

module.exports = requestHelper;
