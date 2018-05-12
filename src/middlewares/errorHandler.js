const responseHelper = require('../api/utils/responseHelper');

/**
 * Middleware for handling 404 errors
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res) => {
  if (!res._headerSent) {
    responseHelper.notFound(req, res, 'Path not found');
  }
};
