import { container } from "tsyringe";
import RedisCache from "./implementations/RedisCache";
import { IRedisCache } from "./models/IRedisCache";

container.registerSingleton<IRedisCache>(
    'cacheProvider',
    RedisCache,
);