/**
 * @file Implements APIs for city related data access object methods
 */
 import { Message } from '$lib/message';
 import { Status } from '$lib/status';

/**
 * Represents the lattitude and longitude of a location.
 */
export interface LatLong {
    lattitude: number,
    longitude: number
}

/**
 * Represents a DB containing all deletion logs.
 */
 const citiesDB: Map<string, LatLong> = new Map();

 /**
 * Hardcodes 5 cities into the cities DB.
 */
 function initDB(): void {
    citiesDB.set('New York City', {lattitude: 40.730610, longitude: -73.935242});
    citiesDB.set('Boston', {lattitude: 42.361145, longitude: -71.057083});
    citiesDB.set('Los Angeles', {lattitude: 34.052235, longitude: -118.243683});
    citiesDB.set('Chicago', {lattitude: 41.881832, longitude: -87.623177});
    citiesDB.set('Houston', {lattitude: 29.749907, longitude: -95.358421});
 }
 initDB()

/**
* Returns all the cties in the Database
*
* @return {string[]} - array containing all cities in the database.
*/
export function getAvailableCities(): string[] {
    return Array.from(citiesDB.keys());
}

/**
* Returns the Latitide and Longitude of a passed in City.
*
* @param cityName {string} - the name of the city 
* @return {Message} - array containing all cities in the database.
*/
export function getLatLong(cityName: string): Message {
    if (citiesDB.has(cityName)) {
        return new Message(Status.SUCCESS, "Coordinated found.", undefined, citiesDB.get(cityName))
    } else {
        return new Message(Status.FAILED, "Coordinated Not found..")
    }
}
