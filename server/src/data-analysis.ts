// This will handle sending a request to the Python code and
// expects an updated feedback field result to both save to
// the database and send to the host

import axios from "axios";
import { IEvent, IField } from "./models/event";

export const analyseData = async (
  newValue: any,
  field: IField,
  eventDocument: IEvent
) => {
  try {
    if (field.fieldType === "mood") {
      const res = await axios.post("http://localhost:4000/emoji", {
        newValue,
        field,
      });

      const newField = res.data.field;
      console.log(newField);

      for (let i = 0; i < eventDocument.feedback.length; i++) {
        if (eventDocument.feedback[i]._id.toString() === newField._id) {
          eventDocument.feedback[i] = newField;
          break;
        }
      }
      eventDocument.save();
    }
  } catch (error) {
    console.log(error);
  }
  return;
};
