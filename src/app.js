import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import exLogger from 'express-bunyan-logger'
import api from './api'
import config from './config'
import logger from './logger'
import { connect } from './db'

const app = express();

// Parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(exLogger({ logger: logger, excludes: ['*'] }));

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err)
});

// log error to logger
app.use((err, req, res, next) => {
  logger.error(err);
  next(err)
});

// must connect to database before server is ready
connect().then(() => {
  app.listen(config.get('port'), () => {
    logger.info(`Express server listening on port ${config.get('port')} in ${config.get('NODE_ENV')} mode.`)
  })
});
