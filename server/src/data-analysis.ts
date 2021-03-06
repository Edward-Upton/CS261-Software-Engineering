// This will handle sending a request to the Python code and
// expects an updated feedback field result to both save to
// the database and send to the host

import axios from "axios";

import { IEvent, IField } from "./models/event";
import { updateHosts } from "./socket";

export const analyseData = async (
  value: number | string,
  field: IField,
  event: IEvent
): Promise<void> => {
  try {
    let URI = "http://localhost:4000";
    switch (field.fieldType) {
      case "mood":
        URI += "/emoji";
        break;
      case "rating":
        URI += "/rating";
        break;
      case "text":
        URI += "/text";
        break;
    }
    const response = await axios.post(URI, {
      value,
      field,
      startTime: event.start,
    });
    const newField = response.data.field;
    field.data = newField.data;
    console.log(field.data);
    await event.save();
    updateHosts(event.host.toHexString(), event);
  } catch (error) {
    console.log(error);
  }
};
