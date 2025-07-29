import express from "express";
import axios from "axios";
import {
    formatLocalTime,
    getCurrentYear,
    formatTodayString,
} from './utils/timeUtils.js';
import { mockDataWeather } from './mock/weather.js';
import { mockDataUV } from './mock/uv.js';
import {
    UV_API_URL,
    uvConfig,
    WEATHER_API_URL,
    weatherConfig,
} from './config/apiConfig.js';

const app = express();
const port = 3000;

const useMockData = true;

app.use(express.static("public"))

app.get("/", async (req, res) => {
    try {
        let uvResult, weatherResult;

        if (useMockData) {

            uvResult = mockDataUV.result;
            weatherResult = mockDataWeather.weather;
            console.log("Use Mock Data.")

        } else {

            const uvResponse = await axios.get(UV_API_URL, uvConfig);

            const weatherResponse = await axios.get(WEATHER_API_URL, weatherConfig);

            uvResult = uvResponse.data.result;
            weatherResult = weatherResponse.data.weather;
            console.log("Use API Data.");
        }

        const uv = Math.round(uvResult.uv);
        const uvMax = Math.round(uvResult.uv_max);
        const ozone = uvResult.ozone;
        const uvTime = formatLocalTime(uvResult.uv_time);
        const uvMaxTime = formatLocalTime(uvResult.uv_max_time);

        const weather = weatherResult[0].main;
        const description = weatherResult[0].description;
        const icon = weatherResult[0].icon;

        const currentYear = getCurrentYear();
        const todayString = formatTodayString();


        res.render("index.ejs", {
            uv,
            uvTime,
            uvMax,
            uvMaxTime,
            ozone,
            weather,
            description,
            icon,
            currentYear,
            todayString,
        });
    } catch (error) {
        if (error.response && error.response.data) {
            console.log("Request failed:", error.response.data);
        } else {
            console.log("Request failed:", error.message);
        }

        res.render("index.ejs", {
            uv: null,
            uvTime: null,
            uvMax: null,
            uvMaxTime: null,
            ozone: null,
            sunrise: null,
            sunset: null,
            weather: null,
        });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
