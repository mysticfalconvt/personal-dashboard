import { useState } from "react";

export const useTextTheme = () => {
  const [textTheme, setTextTheme] = useState("text-white");
  const theme = textTheme === "text-white" ? "text-white" : "text-black";

  return { theme, setTextTheme };
};
