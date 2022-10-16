import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  return brightness > 150 ? "text-black" : "text-white";
};

type Props = {
  setTheme: (theme: string) => void;
};
// get a background image from the background api
export default function Background({ setTheme }: Props) {
  const { data } = useQuery(["background"], fetchBackground, {
    initialData: ["https://www.nekpics.com/img/s/v-10/p1113504077.jpg"],
    refetchInterval: backgroundRefetchTime,
    staleTime: 0,
  });

  const [image, setImage] = useState(data[0]);
  const [nextImage, setNextImage] = useState(data[0]);

  // switch to a new image every n seconds
  setTimeout(async () => {
    const color = await getColor(nextImage);
    const textColor = getTextTheme(color);
    console.log("Text color: ", textColor);
    setTheme(getTextTheme(color));
    setImage(nextImage);

    setNextImage(data[Math.floor(Math.random() * data.length)]);
  }, photoChangeTime);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <img src={image} className="w-full h-full object-cover" />
    </div>
  );
}
