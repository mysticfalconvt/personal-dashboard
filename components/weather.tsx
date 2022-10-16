import { useQuery } from "@tanstack/react-query";
import { weatherRefetchTime } from "../constants";
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
  const { data } = useQuery(
    ["weather", "forecast"],
    () => fetch("api/weather").then((res) => res.json()),
    {
      refetchInterval: weatherRefetchTime,
    }
  );
  const currentWeather = data?.current as CurrentWeather;
  const forecast = data?.forecast;
  // console.log(data);
  if (!currentWeather?.weather) return <div>Loading...</div>;
  // console.log(currentWeather);
  const iconUrl = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
  //   convert temp from kelvin to fahrenheit
  const currentTemp = Math.round(currentWeather.main.temp * (9 / 5) - 459.67);
  const futureWeather =
    forecast?.list
      ?.map((chunk: any) => {
        const date = new Date(chunk.dt * 1000);
        const Icon = `http://openweathermap.org/img/wn/${chunk.weather[0].icon}.png`;
        const temp = Math.round(chunk.main.temp * (9 / 5) - 459.67);
        return {
          date,
          Icon,
          temp,
        };
      })
      .slice(0, 9) || [];
  // console.log(futureWeather);

  return (
    <div className="flex flex-col items-center justify-center z-20">
      <div className="text-3xl font-bold">Current Weather</div>
      <img src={iconUrl} className="justify-center" />
      <div className="text-2xl font-bold">
        {currentWeather.weather[0].description}
      </div>
      <div className="text-2xl font-bold">{currentTemp}°F</div>
      <div className="text-2xl font-bold">
        Feels like{" "}
        {Math.round(currentWeather.main.feels_like * (9 / 5) - 459.67)}
        °F
      </div>
      <div className="text-1xl ">Humidity: {currentWeather.main.humidity}%</div>
      <div className="text-1xl ">Wind: {currentWeather.wind.speed}mph</div>
      <div className="text-2xl ">Future</div>
      <div className="flex flex-col">
        {futureWeather.map((chunk: any) => {
          return (
            <div
              className="flex flex-row items-center justify-center p-0 m-0"
              key={chunk.date}
            >
              <div>
                {chunk.date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
              </div>
              <div> - {chunk.temp} °F </div>
              <img src={chunk.Icon} className="w-7 h-7" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
