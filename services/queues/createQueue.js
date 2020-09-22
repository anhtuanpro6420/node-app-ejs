var Queue = require('bull');

const redisClient = require('../../db/redis');

const createQueue = (queueName) => {
  return new Queue(queueName, redisClient);
};

module.exports = createQueue;
