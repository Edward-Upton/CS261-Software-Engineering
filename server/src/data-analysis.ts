// This will handle sending a request to the Python code and
// expects an updated feedback field result to both save to
// the database and send to the host

import axios, { AxiosPromise, AxiosStatic } from "axios";
import { IEvent, IField } from "./models/event";

export const analyseData = async (
  newValue: number | string,
  field: IField,
  eventDocument: IEvent
): Promise<IEvent> => {
  try {
    let res: any;
    if (field.fieldType === "mood") {
      // For emoji selection
      if (typeof newValue !== "number") {
        // The submitted data is of the wrong type
        console.log("Emoji value given not a number");
        return eventDocument;
      }

      res = await axios.post("http://localhost:4000/emoji", {
        newValue,
        field,
      });
    } else if (field.fieldType === "rating") {
      // For rating selection
      if (typeof newValue !== "number") {
        // The submitted data is of the wrong type
        console.log("Rating value given not a number");
        return eventDocument;
      }

      res = await axios.post("http://localhost:4000/rating", {
        newValue,
        field,
      });
    } else if (field.fieldType === "text") {
      if (typeof newValue !== "string") {
        // The submitted data is of the wrong type
        console.log("Text value given not a string");
        return eventDocument;
      }

      res = await axios.post("http://localhost:4000/text", {
        newValue,
        field,
      });
    }

    const newField = res.data.field;
    console.log(newField);

    // This here isn't that optimal
    for (let i = 0; i < eventDocument.feedback.length; i++) {
      if (eventDocument.feedback[i]._id.toString() === newField._id) {
        eventDocument.feedback[i] = newField;
        break;
      }
    }
    eventDocument.save();
  } catch (error) {
    console.log(error);
  }
  return eventDocument;
};
