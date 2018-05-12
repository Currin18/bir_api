/**
 * BIR API CONFIG FILE
 */
module.exports = {
  // APP GENERAL SETTINGS
  app: {
    port: 10010,
    env: 'local',
    originWhitelist: false, // if origin whitelist is enabled
    // cache: {
    //   // Note: Some db values will be override by redis cache if `enabled` = true,
    //   // set to false on local to avoid data being cached when redis is running
    //   enabled: true, // true to enable cache
    //   itemsTtl: 600, // TTL for items in redis
    // },
  },
  // ORM SETTINGS
  // sequelize: {
  //   username: 'operational',
  //   password: 'operational',
  //   database: 'operational',
  //   host: 'localhost',
  //   dialect: 'postgres',
  //   logging: false,
  //   pool: {
  //     max: 5,
  //   },
  //   dialectOptions: {
  //     statement_timeout: 10000, // postgresql query timeout
  //   },
  // },
  // MONGO CLIENT SETTINGS
  mongo: {
    uri: 'mongodb://localhost:27017/birdb',
    useMongoClient: true,
    poolSize: 5,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // mongodb connection timeouts
    socketTimeoutMS: 10000,
  },
  mongoSchema: {
    bufferCommands: false,
  },
  // BUNYAN LOGGIN SETTINGS
  bunyan: {
    name: 'BIR-API',
    level: 'debug', // fatal -> error -> warn -> info -> debug
    stream: process.stdout,
  },
  // REDIS SETTINGS
  // redis: {
  //   host: '127.0.0.1',
  //   port: 6379,
  //   db: 2,
  // },
};
