const bunyan = require('bunyan');
const bunyanConfig = require('../../config/config').bunyan;
const appConfig = require('../../config/config').app;

const config = Object.assign({ env: appConfig.env }, bunyanConfig);
const logger = bunyan.createLogger(config);

module.exports = logger;
