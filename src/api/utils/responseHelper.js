const logger = require('../utils/logger');
const STATUS = require('http-status-codes');
const ip = require('../utils/ip');

/**
 * Helper for send API responses
 */
class ResponseHelper {
  static _getLog(req, message) {
    const appKey = ''; //req.applicationObject ? req.applicationObject.publicKey : null;
    const responseTime = new Date().getTime() - req.__startTime__;
    const IP = ip(req);
    const log = {
      type: 'RESPONSE', method: req.method, path: req.originalUrl, responseTime, appKey, IP,
    };
    return Object.assign(log, message);
  }
  /**
   * 400 Bad request
   * @param {response} res
   * @param {string} message
   */
  static badRequest(req, res, message = 'Bad request') {
    const error = {
      statusCode: STATUS.BAD_REQUEST,
      message,
    };
    logger.error(ResponseHelper._getLog(req, error));
    res.status(error.statusCode).json(error);
  }

  /**
   * 200 OK
   * @param {response} res
   * @param {json} body
   */
  static ok(req, res, body = null) {
    const response = {
      statusCode: STATUS.OK,
      message: 'OK',
    };

    if (body) {
      response.data = body;
    }

    logger.info(ResponseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }

  /**
   * 404 Not found
   * @param {response} res
   * @param {string} message
   */
  static notFound(req, res, message = 'Resource not found') {
    const error = {
      statusCode: STATUS.NOT_FOUND,
      message,
    };
    logger.debug(ResponseHelper._getLog(req, error));
    res.status(error.statusCode).json(error);
  }

  /**
   * 201 Created
   * @param {response} res
   * @param {json} body
   */
  static created(req, res, body) {
    const response = {
      statusCode: STATUS.CREATED,
      message: 'CREATED',
      data: body,
    };
    logger.info(ResponseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }

  /**
   * 403 Forbidden
   * @param {response} res
   * @param {string} message
   */
  static forbidden(req, res, message) {
    const error = {
      statusCode: STATUS.FORBIDDEN,
      message,
    };
    logger.error(ResponseHelper._getLog(req, error));
    res.status(error.statusCode).json(error);
  }

  /**
   * 500 Internal server error
   * @param {response} res
   * @param {string} message
   */
  static error(req, res, message = 'Internal server error') {
    const error = {
      statusCode: STATUS.INTERNAL_SERVER_ERROR,
      message,
    };
    logger.error(ResponseHelper._getLog(req, error));
    res.status(error.statusCode).json(error);
  }

  /**
   * 409 Conflict
   * @param {response} res
   * @param {string} message
   */
  static conflict(req, res, message = 'Resource already exists') {
    const response = {
      statusCode: STATUS.CONFLICT,
      message,
    };
    logger.info(ResponseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }

  /**
   * 204 No content
   * @param {response} res
   * @param {string} message
   */
  static noContent(req, res, message) {
    const response = {
      statusCode: STATUS.NO_CONTENT,
      message,
    };
    logger.info(ResponseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }

  /**
   * 503 Service unavailable
   * @param {response} res
   * @param {string} message
   */
  static noService(req, res, message = 'Service unavailable') {
    const response = {
      statusCode: STATUS.SERVICE_UNAVAILABLE,
      message,
    };
    logger.info(ResponseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }


  /**
   * 302 Temporarily moved
   * @param {object} request
   * @param {object} response
   * @param {string} url - url to redirect
   * @return 302 status
   */
  static redirect(req, res, url) {
    const response = {
      statusCode: STATUS.MOVED_TEMPORARILY,
    };
    // logger.info(ResponseHelper._getLog(req, response));
    // Redirection
    res.setHeader('Location', url);
    res.status(response.statusCode).send();
  }
}

module.exports = ResponseHelper;
