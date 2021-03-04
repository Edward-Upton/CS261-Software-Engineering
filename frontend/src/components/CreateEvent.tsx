import { useEffect, useState } from "react";
import DateTime from "react-datetime";
import { IconContext } from "react-icons";
import { IUser } from "../types";
import { INewField, FieldTypes } from "../types";

import "./CreateEvent.css";
import "react-datetime/css/react-datetime.css";

import MyButton from "./MyButton";
import MyTextField from "./MyTextField";
import NewField from "./NewField";
import Invite from "./Invite";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from "axios";

interface Props {
  user: IUser;
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
    <div className="createEvent">
      <div className="createEvent__header">
        {/* Create event title */}
        <div className="createEvent__header__title">Create a New Event</div>

        {/* Close button */}
        <IconContext.Provider
          value={{ className: "createEvent__header__icon" }}
        >
          <IoArrowBackCircleOutline onClick={props.closeClicked} />
        </IconContext.Provider>
      </div>

      {/* Form section for event details */}
      <div className="createEvent__content">
        <div>
          <div className="createEvent__group">
            {/* Event name */}
            <MyTextField
              type="text"
              placeholder="..."
              label="Name:"
              onChange={(v) => setEventName(v)}
              value={eventName}
              styled={{
                marginBottom: "0.5rem",
                height: "2.5rem",
                border: "none",
              }}
            />

            {/* Event type */}
            <MyTextField
              type="text"
              placeholder="..."
              label="Description"
              onChange={(v) => setEventType(v)}
              value={eventType}
              styled={{ border: "none", height: "2.5rem" }}
            />
          </div>

          {/* Event start and end date and time */}
          <div className="createEvent__group">
            <div className="createEvent__group__title">Event Date</div>
            <div className="createEvent__dates">
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
                    placeholder: "Start Date...",
                  }}
                />
              </div>

              <div className="createEvent__date__to">to</div>

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
                    placeholder: "End Date...",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Event fields */}
          <div className="createEvent__group">
            <div className="createEvent__group__title">Feedback Fields</div>
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
              fontSize="1.2rem"
              textColour="#336666"
              onClick={() => addField("mood")}
              styled={{
                width: "auto",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                backgroundColor: "white",
                borderRadius: "4rem",
              }}
            >
              Add Field
            </MyButton>
          </div>

          {/* Invite participants */}
          <div className="createEvent__group">
            <div className="createEvent__group__title">Invited Participants</div>
            <Invite
              participants={eventParticipants}
              addParticipant={addParticipant}
            />
          </div>
        </div>
      </div>

      {/* Create Event Button */}
      <MyButton onClick={createEvent} styled={{ backgroundColor: "#59c9a5" }}>
        Create Event
      </MyButton>
    </div>
  );
};

export default CreateEvent;
