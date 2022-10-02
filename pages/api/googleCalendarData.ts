// get google calendar events from google api
import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { calendarId } = req.query;
  const calendar = google.calendar({
    version: "v3",
    auth: process.env.CALENDAR_API_KEY,
  });
  const events = await calendar.events.list({
    calendarId: calendarId as string,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  res.status(200).json(events.data.items);
};
