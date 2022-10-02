import Image from "next/image";
import { useEffect, useState } from "react";

// get a background image from the background api
export default function Background() {
  const [background, setBackground] = useState("");
  const [update, setUpdate] = useState(false);
  // get a new background image every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(!update);
    }, 60000);
    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    if (update) {
      fetch("api/backgroundImage")
        .then((res) => res.json())
        .then((data) => {
          setBackground(data.image);
        });
    }
  }, [update]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <Image
        src={background !== "" ? `/images/${background}` : "/images/1.jpg"}
        className="w-full h-full object-cover"
        layout="fill"
      />
    </div>
  );
}
