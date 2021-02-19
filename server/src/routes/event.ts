import { Router, Request, Response } from "express";
import { stringify } from "querystring";
import { analyseData } from "../data-analysis";

import Event, { IEvent, IField } from "../models/event";

const router = Router();

// Get all events
// This shouldn't really stay here since not secure
router.get("/allEvents", async (req: Request, res: Response) => {
  try {
    const events = await Event.find({});
    return res.status(200).json({ events, count: events.length });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/participating", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const joinedEvents = await Event.find({ participants: userId?.toString() });
    return res
      .status(200)
      .json({ events: joinedEvents, count: joinedEvents.length });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/hosting", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const joinedEvents = await Event.find({ host: userId?.toString() });
    return res
      .status(200)
      .json({ events: joinedEvents, count: joinedEvents.length });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/join", async (req: Request, res: Response) => {
  try {
    const { userId, inviteCode } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "No userId supplied" });
    }
    if (!inviteCode) {
      return res.status(400).json({ message: "No invite code supplied" });
    }
    await Event.updateOne({ inviteCode }, { $push: { participants: userId } });
    return res.status(200).json({ message: "Successfully joined event." });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Create a new event
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      eventType,
      start,
      end,
      host,
      participants,
      feedbackFields,
    } = req.body;
    const feedback: any = [];
    feedbackFields.forEach(
      (field: {
        name: string;
        description: string;
        fieldType: string;
        constraints: any;
      }) => {
        // Create the feedback data for the different types.
        const { name, description, fieldType, constraints } = field;
        if (fieldType === "mood") {
          feedback.push({
            ...field,
            data: { average: 2.5, timeSeries: [], num: 0 },
          });
        } else if (fieldType === "rating") {
          feedback.push({
            ...field,
            data: { average: 2.5, timeSeries: [], num: 0 },
          });
        } else if (fieldType === "slider") {
          feedback.push({
            ...field,
            data: { average: 2.5, timeSeries: [], num: 0 },
          });
        } else if (fieldType === "text") {
          feedback.push({
            ...field,
            data: { average: 0, wordFreq: {}, timeSeries: [], num: 0 },
          });
        }
      }
    );

    // Create a unique code
    let inviteCode = makeCode();
    let duplicateCode = await Event.findOne({ inviteCode: inviteCode });
    while (duplicateCode) {
      // This is a duplicate invite code, generate another
      inviteCode = makeCode();
      duplicateCode = await Event.findOne({ inviteCode: inviteCode });
    }

    // Create the event entity
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

    // Successfully create new user
    return res.status(201).send({ message: "Event created", event: event });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Add feedback to an event's feedback field
router.post("/submit-feedback", async (req: Request, res: Response) => {
  try {
    const { eventId, userId, fieldId, data } = req.body;

    // Here need to make sure that the user is actually part of the event
    const eventDocument: IEvent = await Event.findById(eventId);
    if (!eventDocument.participants.includes(userId)) {
      // User is not a participant
      return res
        .status(500)
        .send({ message: "User not participant in this event" });
    }

    // Get the feedback field we are submitting data to.
    let field: IField | undefined;
    for (let i = 0; i < eventDocument.feedback.length; i++) {
      if (eventDocument.feedback[i]._id.toString() === fieldId) {
        field = eventDocument.feedback[i];
        break;
      }
    }

    // Check the field ID has found a matching field
    if (!field) {
      return res
        .status(500)
        .send({ message: "Cannot find feedback field with ID given" });
    }

    console.log(data);

    // Here we need to send the current field results and new piece of data to the python data analysis
    analyseData(data, field, eventDocument);

    return res
      .status(200)
      .send({ message: `Feedback received for field '${field.name}'` });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Inspiration from https://stackoverflow.com/a/1349426/9192218
const makeCode = () => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default router;
