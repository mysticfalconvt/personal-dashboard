import { NextApiRequest, NextApiResponse } from "next";

const lat = 44.952141;
const lon = -72.076027;

const apiStringForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`;
const apiStringCurrent = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const weatherForecast = await fetch(apiStringForecast);
  const weatherCurrent = await fetch(apiStringCurrent);

  const dataForecast = await weatherForecast.json();
  const dataCurrent = await weatherCurrent.json();
  const data = {
    forecast: dataForecast,
    current: dataCurrent,
  };
  res.status(200).json(data);
};
