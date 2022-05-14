/**
 * @file Caches weather data, to avoid repeated calls to OpenWeather API
 */
import { getWeatherDescription } from '$lib/services/openweather';

/**
 * Represents the cached value, along with ehrn it was retrieved.
 */
interface chachedObject {
    value: string,
    cachedAt: Date
}

/**
 * Represents the cache, that holds the cached weather data.
 */
const cacheMap: Map<string, chachedObject> = new Map();
const CACHE_TIMEOUT_MINUTES = 2;

/**
 * Helper utility function to add minutes to to Date object
 *
 * @param date {Date} - the Date object to which inutes are to be added
 * @param minutes {number} - the number of minutes to be added
 * @return {Date} - new Date object with the added minutes
 */
function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes*60000);
}

/**
 * Returns the cached weather description if a recent cached data is available, else
 * fetches the data, returns, caches it for future use.
 *
 * @param city {string} - the name of the city whoose weather data is requested
 * @return {string} - the current weather description of the city city
 */
export async function getCachedWeatherDescription(city: string) {
    let usedCache = false;
    if (cacheMap.has(city)) {
        let temp = cacheMap.get(city);
        if (temp && temp.cachedAt && addMinutes(temp?.cachedAt, CACHE_TIMEOUT_MINUTES)  > new Date()) {
            usedCache = true;
            return cacheMap.get(city)?.value
        }
    }
    if (!usedCache) {
        const response = await getWeatherDescription(city);
        cacheMap.set(city, {
            value: response,
            cachedAt: new Date()
        });
        return response;
    }
}
