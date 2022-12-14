// get a random image from public/images
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const images = fs.readdirSync(path.join(process.cwd(), "public/images"));
  const image = images[Math.floor(Math.random() * images.length)];
  const resToSend = {
    image: image || "1.jpg",
    images: images || [],
  };
  res.status(200).json(resToSend);
};
