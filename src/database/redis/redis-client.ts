import { logError, logInfo } from 'core/utils/logger';
import * as Redis from 'redis';
import { getProcessEnv } from 'utils/utils-env-config';

type RedisInitOptions = {
  dbDrop?: boolean;
};

export const redisClient = Redis.createClient({
  url:
    'redis://' +
    getProcessEnv().REDIS_DB_URL +
    ':' +
    getProcessEnv().REDIS_PORT +
    '/' +
    getProcessEnv().REDIS_DB_NUMBER,
  password: getProcessEnv().REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  logError('redisClient.ERROR', err);
});

export async function redisInit(options: RedisInitOptions = {}) {
  logInfo('redisInit.INIT');

  await redisClient.connect().catch((err) => {
    logError('redisInit.connect.ERROR', err);
    throw err;
  });

  //FLUSH === dropDB
  if (options.dbDrop === true) {
    await redisClient.flushDb().catch((err) => {
      logError('redisInit.flushDb.ERROR', err);
      throw err;
    });
  }

  logInfo('redisInit.OK');
}
