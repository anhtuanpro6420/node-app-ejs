const mongoose = require('mongoose');
const { DB_HOST, DB_PORT, DB_NAME } = require('../config/env-variables');

const dbHost = DB_HOST || 'localhost';
const dbPort = DB_PORT || 27017;
const dbName = DB_NAME || 'store';
const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const connectWithRetry = function () {
  // when using with docker, at the time we up containers. Mongodb take few seconds to starting, during that time NodeJS server will try to connect MongoDB until success.
  return mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true, useFindAndModify: false },
    (err) => {
      if (err) {
        console.error(
          'Failed to connect to mongo on startup - retrying in 3 sec',
          err
        );
        setTimeout(connectWithRetry, 3000);
      }
    }
  );
};
connectWithRetry();
