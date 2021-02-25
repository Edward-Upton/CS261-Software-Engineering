import { Router, Request, Response } from "express";
import { customAlphabet } from "nanoid/async";

import Event, { IEvent, IField } from "../models/event";
import User, { IUser } from "../models/user";
import { analyseData } from "../data-analysis";

const router = Router();

// Nano ID generator for invite codes.
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);

/**
 * HTTP GET "/"
 * Returns all the events.
 *
 * /?populate - returns events with user data populated.
 *
 * Returns 200 OK, with all the events in the database.
 * Returns 500 Internal Server Error, if server error.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    // Checks if the query parameters contain populate.
    const populate: boolean = "populate" in req.query;
    // Retrieve all events from database.
    // Populate the host and participants if desired.
    const events: IEvent[] = populate
      ? await Event.find({})
          .populate("participants", "email")
          .populate("host", "email")
      : await Event.find({});
    // Return 200 OK and the array of all events and the count.
    return res.status(200).json({ count: events.length, events });
  } catch (error) {
    // If error, return 500 Internal Server Error and error object.
    return res.status(500).json({ error });
  }
});

/**
 * HTTP GET "/:id"
 * Returns the event with the specified id.
 *
 * :id - the id of the event.
 *
 * /?populate - returns event with user data populated.
 *
 * Returns 200 OK, with the specified event.
 * Returns 500 Internal Server Error, if server error.
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    // Retrieve the id from request parameters.
    const { id } = req.params;
    // Checks if the query parameters contain populate.
    const populate: boolean = "populate" in req.query;
    // Retrieve the event from database.
    // Populate the host and participants if desired.
    const event: IEvent = populate
      ? await Event.findById(id)
          .populate("participants", "email")
          .populate("host", "email")
      : await Event.findById(id);
    // Return 200 OK and the event.
    return res.status(200).json({ event });
  } catch (error) {
    // If error, return 500 Internal Server Error and error object.
    return res.status(500).json({ error });
  }
});

/**
 * HTTP GET "/participating/:userId"
 * Returns events that a user is participating in.
 *
 * :userId - the user id used to search for participating events.
 *
 * /?populate - returns events with user data populated.
 *
 * Returns 200 OK, with all the events a user is participating in.
 * Returns 500 Internal Server Error, if server error.
 */
router.get("/participating/:userId", async (req: Request, res: Response) => {
  try {
    // Retrieve the userId from request parameters.
    const { userId } = req.params;
    // Checks if query parameters contain populate.
    const populate: boolean = "populate" in req.query;
    // Retrieve the user from the database.
    const user: IUser = await User.findById(userId);
    // Retrieve all events the user participates in from the database.
    // Populate the host and participants if desired.
    const events: IEvent[] = populate
      ? await Event.find({ participants: user._id })
          .populate("participants", "email")
          .populate("host", "email")
      : await Event.find({ participants: user._id });
    // Return 200 OK and the array of events and the count.
    return res.status(200).json({ count: events.length, events });
  } catch (error) {
    // If error, return 500 Internal Server Error and error object.
    return res.status(500).json({ error });
  }
});

/**
 * HTTP GET "/hosting/:userId"
 * Returns events that a user is hosting.
 *
 * :userId - the user id used to search for hosting events.
 *
 * /?populate - returns events with user data populated.
 * / - returns events without user data populated.
 *
 * Returns 200 OK, with all the events a user is hosting.
 * Returns 500 Internal Server Error, if server error.
 */
router.get("/hosting/:userId", async (req: Request, res: Response) => {
  try {
    // Retrieve the id from request parameters.
    const { userId } = req.params;
    // Checks if query parameters contain populate.
    const populate: boolean = "populate" in req.query;
    // Retrieve the user from the database.
    const user: IUser = await User.findById(userId);
    // Retrieve all events the user hosts from the database.
    // Populate the host and participants if desired.
    const events: IEvent[] = populate
      ? await Event.find({ host: user._id })
          .populate("participants", "email")
          .populate("host", "email")
      : await Event.find({ host: user._id });
    // Return 200 OK and the array of events and the count.
    return res.status(200).json({ count: events.length, events });
  } catch (error) {
    // If error, return 500 Internal Server Error and error object.
    return res.status(500).json({ error });
  }
});

/**
 * HTTP POST "/join"
 * Add a user to the list of participants of an event.
 *
 * Accepts JSON body { userId: string, inviteCode: string}.
 *
 * /?populate - returns event with user data populated.
 * / - returns event without user data populated.
 *
 * Returns 201 Created, with the updated event.
 * Returns 500 Internal Server Error, if server error.
 */
router.post("/join", async (req: Request, res: Response) => {
  try {
    // Retrieve the userId and inviteCode from request body.
    const { userId, inviteCode } = req.body;
    // Check if body contains userId and inviteCode.
    if (!userId)
      return res.status(400).json({ message: "No userId supplied." });
    if (!inviteCode)
      return res.status(400).json({ message: "No inviteCode supplied." });
    // Checks if the query parameters contain populate.
    const populate: boolean = "populate" in req.query;
    // Retrieve the user from the database.
    const user: IUser = await User.findById(userId);
    // Push the user to the list of participants of the event.
    // Use $addToSet to avoid duplicates.
    await Event.updateOne(
      { inviteCode },
      { $addToSet: { participants: user._id } }
    );
    // Retrieve the event from database.
    // Populate the host and participants if desired.
    const event: IEvent = populate
      ? await Event.findOne({ inviteCode })
          .populate("participants", "email")
          .populate("host", "email")
      : await Event.findOne({ inviteCode });
    // Return 201 Created and the updated event.
    return res.status(201).json({ event });
  } catch (error) {
    // If error, return 500 Internal Server Error and error object.
    return res.status(500).json({ error });
  }
});

/**
 * HTTP POST "/"
 * Creates a new event.
 *
 * Accepts JSON body {
 *   name: string,
 *   eventType: string,
 *   start: Date,
 *   end: Date,
 *   host: string,
 *   participants: string[]
 * }.
 *
 * Returns 201 Created, with the updated event.
 * Returns 400 Bad Request, if incorrect request body.
 * Returns 500 Internal Server Error, if server error.
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    // Retrieve event properties from request body.
    const {
      name,
      eventType,
      start,
      end,
      host,
      participants,
    }: IEvent = req.body;
    // Check body contains required fields, if not return 400 Bad Request.
    if (!name || !eventType || !start || !end || !host || !participants)
      return res.status(400).json({ message: "Missing fields in body." });
    // Retrieve event feedback from request body and process.
    const feedback: IField[] = req.body.feedback.map((field: IField) => {
      switch (field.fieldType) {
        case "mood":
          return {
            ...field,
            data: { average: 2.5, timeSeries: [], num: 0 },
          };
        case "rating":
          return {
            ...field,
            data: { average: 2.5, timeSeries: [], num: 0 },
          };
        case "slider":
          return {
            ...field,
            data: { average: 2.5, timeSeries: [], num: 0 },
          };
        case "text":
          return {
            ...field,
            data: { average: 0, wordFreq: {}, timeSeries: [], num: 0 },
          };
      }
    });
    // Generate a new invite code.
    const inviteCode = await nanoid();
    // Create a new event entity and save to database.
    const event = new Event({
      name,
      eventType,
      start,
      end,
      host,
      participants,
      inviteCode,
      feedback,
    });
    await event.save();
    // Return 201 Created and the new event
    return res.status(201).send({ event });
  } catch (error) {
    // If error, return 500 Internal Server Error and error object.
    return res.status(500).json({ error });
  }
});

/**
 * HTTP POST "/submit-feedback"
 * Submit feedback to an event.
 *
 * Accepts JSON body { eventId, userId, fieldId, data }.
 *
 * Returns 201 Created, .
 * Returns 403 Forbidden, if .
 * Returns 500 Internal Server Error, if server error.
 */
router.post("/submit-feedback", async (req: Request, res: Response) => {
  try {
    // Retrieve eventId, userId, fieldId and data from request body.
    const { eventId, userId, fieldId, data } = req.body;
    // Retrieve the event from the database.
    const event: IEvent = await Event.findById(eventId);
    // Ensure the user is a participant of the event, if not return 403 Forbidden.
    if (!event.participants.includes(userId))
      return res.status(403).send({ message: "User not a participant." });
    // === TODO: cleanup this code ===
    // Get the feedback field we are submitting data to.
    let field: IField | undefined;
    for (let i = 0; i < event.feedback.length; i++)
      if (event.feedback[i]._id.toString() === fieldId) {
        field = event.feedback[i];
        break;
      }
    // Check the field ID has found a matching field
    if (!field)
      return res.status(500).send({ message: "Invalid feedback field ID." });

    console.log(data);

    // Here we need to send the current field results and new piece of data to the python data analysis
    analyseData(data, field, event);

    return res.status(200).send({ message: "Feedback received." });
  } catch (error) {
    // If error, return 500 Internal Server Error and error object.
    return res.status(500).json({ error });
  }
});

export default router;
