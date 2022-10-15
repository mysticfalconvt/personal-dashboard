import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { backgroundRefetchTime } from "../constants";

const fetchBackground = async () => {
  const res = await fetch("api/backgroundImage");
  return res.json();
};

// get a background image from the background api
export default function Background() {
  const { data } = useQuery(["background"], fetchBackground, {
    initialData: { image: "1.jpg" },
    refetchInterval: backgroundRefetchTime,
    staleTime: 0,
  });
  const background = data?.image;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <Image
        src={`/images/${background}`}
        className="w-full h-full object-cover"
        layout="fill"
      />
    </div>
  );
}
