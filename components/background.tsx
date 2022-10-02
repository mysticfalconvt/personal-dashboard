import { useEffect, useState } from "react";

// get a background image from the background api
export default function Background() {
  const [background, setBackground] = useState("");
  useEffect(() => {
    fetch("api/backgroundImage")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBackground(data.image);
      });
  }, []);
  console.log(background);
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <img
        src={`/images/${background}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
