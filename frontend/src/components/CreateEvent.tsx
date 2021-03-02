import { useEffect, useState } from "react";
import DateTime from "react-datetime";
import { IconContext } from "react-icons";
import { User } from "../types";
import { INewField, FieldTypes } from "../types";

import "./CreateEvent.css";
import "react-datetime/css/react-datetime.css";

import MyButton from "./MyButton";
import MyTextField from "./MyTextField";
import NewField from "./NewField";
import Invite from "./Invite";
import FieldList from "./FieldList";

import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

interface Props {
  user: User;
  closeClicked: () => void;
}

// This component is for the user to create an event and be the
// host of it. It allows setting up the event with a name, type,
// any number of "fields" that participants will respond to and
// the option to add users as participants using their email.
const CreateEvent: React.FC<Props> = (props) => {
  // These are details of an event for the event creationg
  const [eventName, setEventName] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventStart, setEventStart] = useState<Date>(new Date());
  const [eventEnd, setEventEnd] = useState<Date>(new Date());
  const [feedbackFields, setFeedbackFields] = useState<INewField[]>([]);
  const [eventParticipants, setEventParticipants] = useState<
    { id: string; email: string }[]
  >([]);

  // On initial render, reset all the event details
  useEffect(() => {
    resetFields();
  }, []);

  // This resets the details with a predefined example for a field.
  const resetFields = () => {
    setEventName("");
    setEventType("");
    setEventStart(new Date());
    setEventEnd(new Date());
    setFeedbackFields([
      {
        name: "How do you feel about the session?",
        description:
          "Select the emoji that best represents your current feeling of the session.",
        fieldType: "mood",
        constraints: {},
      },
    ]);
    setEventParticipants([]);
  };

  // Create an event by sending the event details to the server.
  const createEvent = async () => {
    try {
      // Only send the participants ids.
      console.log(eventParticipants.map(({ id }, i) => id));
      await axios.post("/api/event/", {
        name: eventName,
        eventType: eventType,
        start: eventStart,
        end: eventEnd,
        host: props.user._id,
        participants: eventParticipants.map(({ id }, i) => {
          return id;
        }),
        feedback: feedbackFields,
      });
      props.closeClicked();
    } catch (error) {
      console.log(error);
    }
  };

  // Update the information for an event field
  const updateField = (index: number, newField: INewField) => {
    var tempFeedbackFields = [...feedbackFields];
    tempFeedbackFields[index] = newField;
    setFeedbackFields(tempFeedbackFields);
  };

  // Create a new event field with the specified type.
  const addField = (fieldType: FieldTypes) => {
    var tempFeedbackFields = [...feedbackFields];
    tempFeedbackFields.push({
      name: "",
      description: "",
      fieldType: fieldType,
      constraints: {},
    });
    setFeedbackFields(tempFeedbackFields);
  };

  // Delete an event field by using it's index.
  const deleteField = (index: number) => {
    var tempFeedbackFields = [...feedbackFields];
    tempFeedbackFields.splice(index, 1);
    setFeedbackFields(tempFeedbackFields);
  };

  // Add a participant to the event by verifying that the email
  // is of someone who has an account.
  const addParticipant = (id: string, email: string) => {
    var tempParticipants = [...eventParticipants];
    var i;
    for (i = 0; i < tempParticipants.length; i++) {
      if (tempParticipants[i].email === email) {
        return;
      }
    }
    tempParticipants.push({
      id,
      email,
    });
    setEventParticipants(tempParticipants);
    console.log(eventParticipants);
  };

  return (
    <div id="createEvent">
      <div id="createEvent__header">
        {/* Create event title */}
        <div id="createEvent__header__title">Add Event</div>

        {/* Close button */}
        <IconContext.Provider
          value={{ className: "createEvent__header__icon" }}
        >
          <AiOutlineCloseCircle onClick={props.closeClicked} />
        </IconContext.Provider>
      </div>

      {/* Form section for event details */}
      <div id="createEvent__content">
        <div>
          {/* Event name */}
          <MyTextField
            type="text"
            placeholder="Event Name..."
            onChange={(v) => setEventName(v)}
            value={eventName}
            styled={{ marginBottom: "0.5rem" }}
          />

          {/* Event type */}
          <MyTextField
            type="text"
            placeholder="Event Type..."
            onChange={(v) => setEventType(v)}
            value={eventType}
            styled={{ marginBottom: "0.5rem" }}
          />

          {/* Event start and end date and time */}
          <div id="createEvent__dates" style={{ marginBottom: "0.5rem" }}>
            {/* Start date and time */}
            <div className="createEvent__date">
              <DateTime
                // defaultValue={new Date().toISOString()}
                onChange={(value) => {
                  if (typeof value !== "string") {
                    setEventStart(value.toDate());
                  }
                }}
                inputProps={{
                  className: "createEvent__date__input",
                  placeholder: "End Date...",
                }}
              />
            </div>

            <div id="createEvent__date__to">to</div>

            {/* End date and time */}
            <div className="createEvent__date">
              <DateTime
                // defaultValue={new Date().toISOString()}
                onChange={(value) => {
                  if (typeof value !== "string") {
                    setEventEnd(value.toDate());
                  }
                }}
                inputProps={{
                  className: "createEvent__date__input",
                  placeholder: "Start Date...",
                }}
              />
            </div>
          </div>

          {/* Event fields */}
          <FieldList title="Feedback Fields">
            {feedbackFields.map((field, i) => {
              return (
                <NewField
                  key={i}
                  index={i}
                  field={field}
                  updateField={updateField}
                  deleteField={deleteField}
                />
              );
            })}
            <MyButton
              text="Add Field"
              onClick={() => addField("mood")}
              styled={{ height: "1.8rem" }}
            />
          </FieldList>

          {/* Invite participants */}
          <Invite
            participants={eventParticipants}
            addParticipant={addParticipant}
          />
        </div>
      </div>

      {/* Create Event Button */}
      <MyButton
        text="Create Event"
        onClick={createEvent}
        styled={{ backgroundColor: "#59c9a5" }}
      />
    </div>
  );
};

export default CreateEvent;
