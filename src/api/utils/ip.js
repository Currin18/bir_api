/**
 * Gets the client IP
 * @param {Request} req
 */
module.exports = (req) => {
  const IP = (req.headers['x-real-ip'] ||
              req.headers['x-forwarded-for'] ||
              req.connection.remoteAddress ||
              req.socket.remoteAddress ||
              req.connection.socket.remoteAddress).split(',')[0];
  return IP;
};
