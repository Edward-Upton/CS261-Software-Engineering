import { useEffect, useState } from "react";
import DateTime from "react-datetime";
import { IconContext } from "react-icons";
import { User } from "../App";
import { INewField, FieldTypes } from "../types";

import "./CreateEvent.css";
import "react-datetime/css/react-datetime.css";

import MyButton from "./MyButton";
import MyTextField from "./MyTextField";
import CreateFields from "./CreateFields";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

interface Props {
  user: User;
  closeClicked: () => void;
}

const CreateEvent: React.FC<Props> = (props) => {
  const [eventName, setEventName] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventStart, setEventStart] = useState<Date>(new Date());
  const [eventEnd, setEventEnd] = useState<Date>(new Date());
  const [feedbackFields, setFeedbackFields] = useState<INewField[]>([]);
  const [eventParticipants, setEventParticipants] = useState<string[]>([]);

  useEffect(() => {
    resetFields();
  }, []);

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

  const createEvent = async () => {
    try {
      const res = await axios.post("/api/event/", {
        name: eventName,
        eventType: eventType,
        start: eventStart,
        end: eventEnd,
        host: props.user._id,
        participants: eventParticipants,
        feedback: feedbackFields,
      });
      props.closeClicked();
    } catch (error) {
      console.log(error);
    }
  };

  const updateField = (index: number, newField: INewField) => {
    var tempFeedbackFields = [...feedbackFields];
    tempFeedbackFields[index] = newField;
    setFeedbackFields(tempFeedbackFields);
  };

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

  const deleteField = (index: number) => {
    var tempFeedbackFields = [...feedbackFields];
    tempFeedbackFields.splice(index, 1);
    setFeedbackFields(tempFeedbackFields);
  };

  return (
    <div className="createEvent">
      <div className="createEvent__header">
        <div className="createEvent__header__title">Add Event</div>
        <IconContext.Provider
          value={{ className: "createEvent__header__icon" }}
        >
          <AiOutlineCloseCircle onClick={props.closeClicked} />
        </IconContext.Provider>
      </div>
      <div className="createEvent__content">
        <div>
          <MyTextField
            type="text"
            placeholder="Event Name..."
            onChange={(v) => setEventName(v)}
            value={eventName}
            styled={{ marginBottom: "0.5rem" }}
          />
          <MyTextField
            type="text"
            placeholder="Event Type..."
            onChange={(v) => setEventType(v)}
            value={eventType}
            styled={{ marginBottom: "0.5rem" }}
          />
          <div
            className="createEvent__dates"
            style={{ marginBottom: "0.5rem" }}
          >
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
            <div className="createEvent__date__to">to</div>
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
          <CreateFields
            fields={feedbackFields}
            updateField={updateField}
            addField={addField}
            deleteField={deleteField}
          />
        </div>
      </div>
      <MyButton
        text="Create Event"
        onClick={createEvent}
        styled={{ backgroundColor: "#59c9a5" }}
      />
    </div>
  );
};

export default CreateEvent;
