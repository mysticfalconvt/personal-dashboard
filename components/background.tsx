import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { backgroundRefetchTime, photoChangeTime } from "../constants";

const fetchBackground = async () => {
  const res = await fetch("api/getPhoto");
  return res.json();
};

// get a background image from the background api
export default function Background() {
  const { data } = useQuery(["background"], fetchBackground, {
    initialData: ["https://www.nekpics.com/img/s/v-10/p1113504077.jpg"],
    refetchInterval: backgroundRefetchTime,
    staleTime: 0,
  });

  const [image, setImage] = useState(data[0]);

  // switch to a new image every n seconds
  setTimeout(() => {
    setImage(data[Math.floor(Math.random() * data.length)]);
  }, photoChangeTime);
  //get random image from the array of image urls

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <img src={image} className="w-full h-full object-cover" />
    </div>
  );
}
