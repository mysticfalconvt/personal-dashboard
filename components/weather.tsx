import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CurrentWeather {
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
}

export default function Weather() {
  const { data } = useQuery(["weather", "forecast"], () =>
    fetch("api/weather").then((res) => res.json())
  );
  const currentWeather = data?.current as CurrentWeather;
  const forecast = data?.forecast;

  if (!currentWeather?.weather) return <div>Loading...</div>;
  // console.log(currentWeather);
  const iconUrl = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
  //   convert temp from kelvin to fahrenheit
  const currentTemp = Math.round(currentWeather.main.temp * (9 / 5) - 459.67);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <div className="text-4xl font-bold">Current Weather for Derby VT</div> */}
      <img src={iconUrl} className="justify-center" />
      <div className="text-2xl font-bold">
        {currentWeather.weather[0].description}
      </div>
      <div className="text-2xl font-bold">{currentTemp}°F</div>
    </div>
  );
}
