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

  return <div className="grid grid-cols-6 gap-6 w-full">photo</div>;
};
