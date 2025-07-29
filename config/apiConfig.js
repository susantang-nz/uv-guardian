import dotenv from "dotenv";
dotenv.config();

export const UV_API_URL = process.env.UV_API_URL;
export const UV_API_KEY = process.env.UV_API_KEY;

export const WEATHER_API_URL = process.env.WEATHER_API_URL;
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const LATITUDE = parseFloat(process.env.LATITUDE);
export const LONGITUDE = parseFloat(process.env.LONGITUDE);

// config for openUV
export const uvConfig = {
    headers: { "x-access-token": UV_API_KEY },
    params: {
        lat: LATITUDE,
        lng: LONGITUDE,
    },
};

// config for openWeather
export const weatherConfig = {
    params: {
        lat: LATITUDE,
        lon: LONGITUDE,
        appid: WEATHER_API_KEY,
    },
};