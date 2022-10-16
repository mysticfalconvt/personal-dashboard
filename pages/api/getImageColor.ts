import { NextApiRequest, NextApiResponse } from "next";

const ColorThief = require("colorthief");

export default async function getImageColor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const image = req.query.image;
  console.log("image", image);
  if (image) {
    const color = await ColorThief.getColor(image);
    console.log("color", color);
    res.status(200).json(color);
  } else res.status(200).json([0, 0, 0]);
}
