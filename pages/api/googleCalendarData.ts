// get google calendar events from google api
import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const calendarId = process.env.CALENDAR_ID;
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const apiKey = process.env.CALENDAR_API_KEY;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY || "";
  const scopes = "https://www.googleapis.com/auth/calendar.readonly";

  const credentials = JSON.parse(process.env.CREDENTIALS || "");
  const escapedPrivateKey = credentials.private_key.replace(/\\n/g, " ");

  const jwt = new google.auth.JWT(
    credentials.client_email,
    undefined,
    escapedPrivateKey,
    scopes
  );
  // console.log("jwt", jwt);
  const calendar = await google
    .calendar({
      version: "v3",
      auth: jwt,
    })
    .events.list({ calendarId });
  console.log("calendar", calendar);

  // const events = await calendar.events.list({
  //   auth: jwt,
  //   calendarId,
  //   timeMin: new Date().toISOString(),
  //   maxResults: 10,
  //   singleEvents: true,
  //   orderBy: "startTime",
  // });
  // console.log("events", events);
  res.status(200).json("hello");
};
