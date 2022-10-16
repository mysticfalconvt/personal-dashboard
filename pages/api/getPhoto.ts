import { NextApiRequest, NextApiResponse } from "next";
// import { stringify } from "querystring";
const convert = require("xml-js");
// import {convert}

const zenfolioUrl = "https://api.zenfolio.com/api/1.8/zfapi.asmx";

const userAgent = "Boskind photo viewer";
const user = process.env.ZENFOLIO_USER;
const password = process.env.ZENFOLIO_PASSWORD;
const galleryId = process.env.ZENFOLIO_GALLERY_ID;

export default async function getPhoto(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const zenfolioRequest = `loginName=${user}&password=${password}`;
  const headers = {
    "User-Agent": userAgent,
    "X-Zenfolio-User-Agent": userAgent,
    host: "api.zenfolio.com",
    "Content-Type": "text/xml",
  };

  //   const profile = await fetch(`${zenfolioProfile}?loginName=${user}`, {
  //     method: "POST",
  //     headers: headers,
  //     body: zenfolioRequest,
  //   });

  //   const profileData = await profile.text();

  //   const userProfile = convert.xml2json(profileData, {
  //     compact: true,
  //     spaces: 4,
  //   });
  //   const profileJson = JSON.parse(userProfile);
  //   const featuredPhotoSets = profileJson.User.FeaturedPhotoSets.PhotoSet;
  //   const photoSetIds = featuredPhotoSets.map((photoSet: any) => {
  //     return {
  //       id: photoSet.Id._text,
  //       //   count: photoSet.Count._text,
  //     };
  //   });

  const photoSetData = await fetch(
    `${zenfolioUrl}/LoadPhotoSet?loginName=${user}&photoSetId=${galleryId}`,
    {
      method: "POST",
      headers: headers,
      body: zenfolioRequest,
    }
  );
  const photoSet = await photoSetData.text();
  const photoSetJson = convert.xml2json(photoSet, {
    compact: true,
    spaces: 4,
  });
  const photoSetDataJson = JSON.parse(photoSetJson);
  const photoSetCount = photoSetDataJson.PhotoSet.PhotoCount._text;

  const photoSetPhotos = await fetch(
    `${zenfolioUrl}/LoadPhotoSetPhotos?loginName=${user}&photoSetId=${galleryId}&startingIndex=0&numberOfPhotos=${photoSetCount}`,
    {
      method: "POST",
      headers: headers,
      body: zenfolioRequest,
    }
  );
  const photoSetPhotosData = await photoSetPhotos.text();
  const photoSetPhotosJson = JSON.parse(
    convert.xml2json(photoSetPhotosData, {
      compact: true,
      spaces: 4,
    })
  );

  const photos = photoSetPhotosJson.ArrayOfPhoto1.Photo.map(
    (photo: any) => photo.OriginalUrl._text
  );

  //   console.log(photoSetIds);
  res.status(200).json(photos);
}
