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

interface Props {
  user: User;
  closeClicked: () => void;
}

const CreateEvent: React.FC<Props> = (props) => {
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventStart, setEventStart] = useState<Date>(new Date());
  const [eventEnd, setEventEnd] = useState<Date>(new Date());
  const [feedbackFields, setFeedbackFields] = useState<INewField[]>([]);
  const [eventParticipants, setEventParticipants] = useState<string[]>([]);

  useEffect(() => {
    setFeedbackFields([
      {
        name: "How do you feel about the session?",
        description:
          "Select the emoji that best represents your current feeling of the session.",
        fieldType: "mood",
        constraints: {},
      },
    ]);
  }, []);

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
            type="area"
            placeholder="Event Description..."
            onChange={(v) => setEventDescription(v)}
            value={eventDescription}
            styled={{ minHeight: "5rem", marginBottom: "0.5rem" }}
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
                    console.log(eventStart);
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
                    setEventStart(value.toDate());
                    console.log(eventStart);
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
      <MyButton text="Create Event" onClick={() => {}} />
    </div>
  );
};

export default CreateEvent;
