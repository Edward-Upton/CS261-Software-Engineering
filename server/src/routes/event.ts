import { Router, Request, Response } from "express";
import { stringify } from "querystring";

import Event from "../models/event";

const router = Router();

// Get all events
// This shouldn't really stay here since not secure
router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await Event.find({});
    return res.status(200).json({ events, count: events.length });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

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
        const { name, description, fieldType, constraints } = field;
        if (fieldType === "mood") {
          feedback.push({ ...field, data: { average: 2.5, timeSeries: [] } });
        } else if (fieldType === "rating") {
          feedback.push({ ...field, data: { average: 2.5, timeSeries: [] } });
        } else if (fieldType === "slider") {
          feedback.push({ ...field, data: { average: 2.5, timeSeries: [] } });
        } else if (fieldType === "text") {
          feedback.push({
            ...field,
            data: { average: 0, wordFreq: {}, timeSeries: [] },
          });
        }
      }
    );

    let inviteCode = makeCode();
    let duplicateCode = await Event.findOne({ inviteCode: inviteCode });
    while (duplicateCode) {
      // This is a duplicate invite code, generate another
      inviteCode = makeCode();
      duplicateCode = await Event.findOne({ inviteCode: inviteCode });
    }

    const event = new Event({
      name,
      eventType,
      start,
      end,
      host,
      participants,
      inviteCode,
      feedback
    });
    await event.save();

    // Successfully create new user
    return res.status(201).send({ message: "Event created", event: event });
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
