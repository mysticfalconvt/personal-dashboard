import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { backgroundRefetchTime, photoChangeTime } from "../constants";

const fetchBackground = async () => {
  const res = await fetch("api/getPhoto");
  return res.json();
};

const getColor = async (url: string) => {
  const nextImageColor = await fetch(`api/getImageColor?image=${url}`);
  const nextImageColorJson = await nextImageColor.json();
  return nextImageColorJson;
};

const getTextTheme = (color: number[]) => {
  const red = color[0];
  const green = color[1];
  const blue = color[2];
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 140 ? "text-black" : "text-white";
};

type Props = {
  setTheme: (theme: string) => void;
};

const getCurrentBackground = async (urls: any[]) => {
  const image = urls[Math.floor(Math.random() * urls.length)];
  const imageAverageColor = await getColor(image);
  const textTheme = getTextTheme(imageAverageColor);
  return { image, textTheme };
};

// get a background image from the background api
export default function Background({ setTheme }: Props) {
  const { data } = useQuery(["background"], fetchBackground, {
    initialData: ["https://www.nekpics.com/img/s/v-10/p1113504077.jpg"],
    refetchInterval: backgroundRefetchTime,
    staleTime: 0,
  });

  const { data: currentDisplay } = useQuery(
    ["color", "displayImage"],
    () => getCurrentBackground(data),
    {
      refetchInterval: photoChangeTime,
      staleTime: 0,
      enabled: data?.length > 1,
    }
  );
  console.log(currentDisplay);
  const color =
    currentDisplay?.textTheme === "text-black" ? "text-black" : "text-white";

  useEffect(() => {
    setTheme(color);
  }, [color, setTheme]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <img src={currentDisplay?.image} className="w-full h-full object-cover" />
    </div>
  );
}
