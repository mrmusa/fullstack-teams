import Bluebird from 'bluebird'
import { MongoClient } from 'mongodb'
import logger from '../logger'
import config from '../config'
const dbUri = config.get('MONGODB_URI');

let db;

export const connect = function (url = dbUri) {
  if (db) {
    return Bluebird.resolve(db);
  }

  return MongoClient.connect(url, { promiseLibrary: Bluebird })
    .then((dbConn) => {
      db = dbConn;
      logger.info('Connected correctly to host for mongodb');
      return db;
    })
    .tap((db) => (
      // idempotent collection/index creation
      Bluebird.each([
        db.createCollection('fullstack-teams')
          .then((teams) => ( teams.createIndex({ module: 1 }, { unique: true, background: true }) ))
      ], result => result))
    )
    .tap(() => logger.info('created collections and indexes successfully'));
};
