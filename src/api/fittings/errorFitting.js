/*eslint-disable*/
/**
 * Handler de error del middleware de swagger
 *
 * CUIDADITO CON TOCAR QUE PUEDE ROMPERSE TODO!!!
 */
'use strict';

var debug = require('debug')('pipes:fittings');
var util = require('util');

module.exports = function create(fittingDef) {

  return function error_handler(context, next) {

    if (!util.isError(context.error)) { return next(); }

    var err = context.error;

    debug('jsonErrorHandler: %s', context.error.message);

    try {
      context.headers['Content-Type'] = 'application/json';

      if (!context.statusCode || context.statusCode < 400) {
        if (context.response && context.response.statusCode && context.response.statusCode >= 400) {
          context.statusCode = context.response.statusCode;
        } else if (err.statusCode && err.statusCode >= 400) {
          context.statusCode = err.statusCode;
          delete(err.statusCode);
        } else {
          context.statusCode = 500;
        }
      }

      Object.defineProperty(err, 'message', { enumerable: true }); // include message property in response
      if (context.statusCode === 500) {
        console.error(err.stack);
      }
      delete(context.error);
      var customMessage = '';

      if(context.statusCode === 405) {
        customMessage = 'Method not allowed';
      }
      else {
        customMessage = (err.message || '');
        if(err.results && err.results.errors && err.results.errors.length) {
          customMessage += ' : ' + (err.results.errors[0].message || '');
          customMessage += (err.results.errors[0].path.length ? ' on field ' + err.results.errors[0].path[0] : '');
        }
      }

      var customError = {
        statusCode: context.statusCode || 400,
        message: customMessage
      };

      // add a custom property to 401
      if( err.data !== undefined && context.statusCode === 401) {
        customError.data = err.data;
      }

      next(null, JSON.stringify(customError));
    } catch (err) {
      debug('jsonErrorHandler unable to stringify error: %j', err);
      next();
    }
  }
};
