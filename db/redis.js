const redis = require('redis');

const { REDIS_HOST, REDIS_PORT } = require('../config/env-variables');

const redisClient = redis.createClient({
  host: REDIS_HOST || '127.0.0.1', // this must match the container name of redis image
  port: REDIS_PORT || 6379,
});

module.exports = redisClient;
