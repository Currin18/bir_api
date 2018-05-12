/*eslint-disable*/
const appConfig = require('../../config/config').app;

/**
 * Handler de CORS del middleware de swagger
 *
 * CUIDADITO CON TOCAR QUE PUEDE ROMPERSE TODO!!!
 */
'use strict';

var debug = require('debug')('pipes:fittings');
var CORS = require('cors');

// config options: https://www.npmjs.com/package/cors

var corsOptionsDelegate = function (req, callback) {
  var origin;
  if (appConfig.originWhitelist === false) {
    origin = '*'
  } else if (req.headers.origin !== undefined) {
    origin = true;
  } else {
    origin = false;
  }

  callback(null, { origin });// access-control-allow origin header with origin
}

module.exports = function create(fittingDef) {

  debug('cors config: %j', fittingDef);
  var middleware = CORS(corsOptionsDelegate);

  return function cors(context, cb) {
    debug('cors exec');
    middleware(context.request, context.response, cb);
  }
};
