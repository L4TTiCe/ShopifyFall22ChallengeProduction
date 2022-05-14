/**
 * @file Service to get weather data from OperWeather API
 */
import axios from 'axios';
import { variables } from '$lib/env';
import type { Message } from '$lib/message';
import { getLatLong } from '$lib/dao/citiesDao';

export async function getWeatherData(latitude: number, longitude: number) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${variables.OPEN_WEATHER_KEY}`);
    return response.data;
}

export async function getWeatherDescription(city: string) {
    const result: Message = getLatLong(city);
		if (result.coordinates) {
			const data = await getWeatherData(result.coordinates.lattitude, result.coordinates.longitude);
			return data.weather[0].main;
		}
}
