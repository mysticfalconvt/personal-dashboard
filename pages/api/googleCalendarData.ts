// get google calendar events from google api
import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const personalCalendarId = process.env.PERSONAL_CALENDAR_ID;
  const familyCalendarId = process.env.FAMILY_CALENDAR_ID;
  const workCalendarId = process.env.WORK_CALENDAR_ID;
  const scopes = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events.readonly",
  ];
  // min is yesterday and max is 2 weeks from now
  const timeMin = new Date(new Date().setDate(new Date().getDate() - 1));
  const timeMax = new Date(new Date().setDate(new Date().getDate() + 14));

  const credentials = JSON.parse(process.env.CREDENTIALS || "");

  const jwt = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    scopes
  );

  const loginAuth = google.auth.fromJSON(credentials);
  // console.log("jwt", jwt);
  const calendar = await google.calendar({
    version: "v3",
    auth: loginAuth,
  });

  const personalCalendar = await calendar.events.list({
    auth: jwt,
    calendarId: personalCalendarId,

    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: "startTime",
  });
  const workCalendar = await calendar.events.list({
    auth: jwt,
    calendarId: workCalendarId,

    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: "startTime",
  });
  const familyCalendar = await calendar.events.list({
    auth: jwt,
    calendarId: familyCalendarId,

    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: "startTime",
  });

  const personalEvents = personalCalendar?.data.items || [];
  const workEvents = workCalendar?.data.items || [];
  const familyEvents = familyCalendar?.data.items || [];
  const allEvents = [...personalEvents, ...workEvents, ...familyEvents];
  const sortedEvents = allEvents.sort((a, b) => {
    const aDate = new Date(a?.start?.dateTime || "Jan 1, 1970");
    const bDate = new Date(b?.start?.dateTime || "Jan 1, 1970");
    return aDate.getTime() - bDate.getTime();
  });

  res.status(200).json({ events: sortedEvents });
};
