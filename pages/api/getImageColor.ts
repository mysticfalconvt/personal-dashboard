import { NextApiRequest, NextApiResponse } from "next";

const ColorThief = require("colorthief");

export default async function getImageColor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const image = req.query.image;
  if (image) {
    const color = await ColorThief.getColor(image);
    res.status(200).json(color);
  } else res.status(200).json([0, 0, 0]);
}
