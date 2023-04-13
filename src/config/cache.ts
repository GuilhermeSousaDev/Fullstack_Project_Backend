import { RedisOptions } from 'ioredis';

interface ICacheConfig {
    config: {
        redis: RedisOptions;
    }
    driver: string;
}

export default {
    config: {
        redis: process.env.APP_API_REDIS_URI,
    },
    driver: 'redis',
} as ICacheConfig;