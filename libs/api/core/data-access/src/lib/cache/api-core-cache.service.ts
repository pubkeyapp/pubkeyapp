import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common'
import { style } from '@ogma/styler'
import { Cache } from 'cache-manager'

export type CacheNamespace = 'atp' | 'bonfida' | 'collection' | 'gum' | 'page' | 'solana' | 'user'

export function getCacheKey(namespace: CacheNamespace, key: string) {
  return `pubkey:${namespace}:${key}`
}

export type Value<T> = T | ValueFn<T>
export type ValueFn<T> = () => Promise<T>

@Injectable()
export class ApiCoreCacheService {
  private readonly logger = new Logger(ApiCoreCacheService.name)
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  del(namespace: CacheNamespace, key: string) {
    const cacheKey = getCacheKey(namespace, key)
    this.logger.debug(`[CACHE DELETE] ${cacheKey} `)
    return this.cache.del(getCacheKey(namespace, key))
  }

  /**
   * Get a value from the cache, or set it if it doesn't exist.
   */
  async wrap<T>(namespace: CacheNamespace, key: string, value: Value<T>, ttl?: number, refresh?: boolean): Promise<T> {
    const fn: ValueFn<T> = (typeof value === 'function' ? value : () => Promise.resolve(value)) as ValueFn<T>
    const cacheKey = getCacheKey(namespace, key)
    const found = await this.get<T>(namespace, key)
    if (!found || refresh) {
      const result = await fn()
      if (typeof result !== 'undefined') {
        await this.set<T>(namespace, key, result, ttl)
        this.logger.verbose(`${style.bYellow.apply('[CACHE MISS]')} ${cacheKey} ttl=${ttl} seconds`)
        this.logger.debug(`[CACHE MISS] ${cacheKey}`)
        return result
      }
      this.logger.verbose(`${style.bYellow.apply('[CACHE PASS]')} ${cacheKey}, result is falsy`)
      return
    }

    // FIXME: Check amount of cache hits
    // this.logger.verbose(`${style.bGreen.apply('[CACHE HIT]')} ${cacheKey} ttl=${ttl} seconds`)
    return found
  }

  /**
   * Get a value from the cache based on the namespace and key.
   */
  get<T>(namespace: CacheNamespace, key: string) {
    return this.cache.get<T>(getCacheKey(namespace, key))
  }

  /**
   * Set a value in the cache based on the namespace and key.
   */
  set<T>(namespace: CacheNamespace, key: string, value: T, ttl?: number) {
    return this.cache.set<T>(getCacheKey(namespace, key), value, { ttl: ttl ?? 5 })
  }
}
