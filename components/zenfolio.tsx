import { useQuery } from "@tanstack/react-query";
import { photoRefetchTime } from "../constants";

export const Zenfolio = () => {
  const { data } = useQuery(
    ["photos", "background"],
    () => {
      return fetch("/api/getPhoto").then((res) => res.json());
    },
    {
      refetchInterval: photoRefetchTime,
    }
  );

  console.log(data);
  // check if dev or prod
  const isDev = process.env.NODE_ENV === "development";
  if (!isDev) return null;

  return <div className="grid grid-cols-6 gap-6 w-full">photo</div>;
};
