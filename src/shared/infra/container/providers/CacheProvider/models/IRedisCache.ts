export interface IRedisCache {
    save<T>(key: string, value: T): Promise<void>;
    recover<T>(key: string): Promise<T>;
    invalidate(key: string): Promise<void>;
}