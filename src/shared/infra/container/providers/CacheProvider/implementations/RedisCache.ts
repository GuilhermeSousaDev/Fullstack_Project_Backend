import Redis, { Redis as RedisClient } from "ioredis";
import cache from '../../../../../../config/cache';
import { IRedisCache } from "../models/IRedisCache";

export default class RedisCache implements IRedisCache {
    client: RedisClient;

    constructor() {
        this.client = new Redis(cache.config.redis);
    }

    public async save<T>(key: string, value: T): Promise<void> {
        this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        this.client.del(key);
    }
}