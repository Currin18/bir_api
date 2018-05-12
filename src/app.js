process.chdir(__dirname);

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const helmet = require('helmet');
const appConfig = require('./config/config').app;
const errorHandler = require('./middlewares/errorHandler');
const requestHandler = require('./middlewares/requestHandler');
const auth = require('./middlewares/auth');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
  // swaggerSecurityHandlers: {
  //   AppKey: auth,
  // },
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // for docs (only local/dev env)
  if (appConfig.env === 'local' || appConfig.env === 'dev') {
    let customCss = '.swagger-ui .topbar { display: none !important } ';
    customCss += '.auth-container h4 code {color : #3b4151} ';
    customCss += '.auth-container h4 {color : #fff !important}';
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, false, {}, customCss));
  }

  // some general request work
  app.use(requestHandler);

  // some security layer
  app.use(helmet());

  // swagger middleware
  swaggerExpress.register(app);

  // for unhundled errors
  app.use(errorHandler);

  const port = appConfig.port || 3000;
  app.listen(port);
});
