import axios from "axios";

import { IEvent, IField } from "./models/event";
import { updateHost } from "./socket";

/**
 * Analyse an entered value by sending a request to the Python
 * data analysis sever and update the event and feedback
 * fields with the returned data.
 * @param value Value to be analysed.
 * @param field Feedback field to be updated.
 * @param event Event to be updated.
 */
export const analyseData = async (
  value: number | string,
  field: IField,
  event: IEvent
): Promise<void> => {
  try {
    // Get the URI of the request from the field type.
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
    // Make a request to the Python data analysis server.
    const response = await axios.post(URI, {
      value,
      field,
      startTime: event.start,
    });
    // Retrieve the updated field data from the sever response.
    const newField = response.data.field;
    // Update the field with the new data
    field.data = newField.data;
    console.log(field.data);
    // Save the new data to the event in the database.
    await event.save();
    // Update the hosts with the new data.
    updateHost(event.host.toHexString(), event);
  } catch (error) {
    console.log(error);
  }
};
