// get google calendar events from google api
import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const calendarId = process.env.CALENDAR_ID;
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const apiKey = process.env.CALENDAR_API_KEY;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY || "";
  const scopes = ["https://www.googleapis.com/auth/calendar.readonly"];

  const escapedPrivateKey = privateKey.replace(/\\n/g, " ");

  const jwt = new google.auth.JWT(email, undefined, escapedPrivateKey, scopes);
  //   console.log("jwt", jwt);
  const calendar = google.calendar({
    version: "v3",
    auth: jwt,
  });
  //   console.log("calendar", calendar);

  const events = await calendar.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  console.log("events", events);
  res.status(200).json("hello");
};
