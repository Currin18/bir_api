/**
 * Middleware for modify response headers and parse request
 * @param {request} req
 * @param {response} res
 * @param {function} next
 */
module.exports = (req, res, next) => {
  req.__startTime__ = new Date().getTime();
  next();
};
