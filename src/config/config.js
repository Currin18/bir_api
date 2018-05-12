let config = {
  // APP ENV
  env: process.env.CONFIGENV || 'local',
};

const file = `../config/config-${config.env}`;
const env = require(file);

config = Object.assign(config, env);

module.exports = config;
