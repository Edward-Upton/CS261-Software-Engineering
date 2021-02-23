import { useState } from "react";
import DateTime from "react-datetime";
import { IconContext } from "react-icons";
import { User } from "../App";
import { IField } from "../types";

import "./CreateEvent.css";
import "react-datetime/css/react-datetime.css";

import MyButton from "./MyButton";
import MyTextField from "./MyTextField";
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
  const [feedbackFields, setFeedbackFields] = useState<IField[]>([]);
  const [eventParticipants, setEventParticipants] = useState<string[]>([]);

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
          />
          <MyTextField
            type="area"
            placeholder="Event Description..."
            onChange={(v) => setEventDescription(v)}
            value={eventDescription}
            styled={{ minHeight: "5rem" }}
          />
          <div className="createEvent__dates">
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
            <div className="createEvent__date__to">
              to
            </div>
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

          <h1>Hello</h1>

          <h1>Hello</h1>

          <h1>Hello</h1>
        </div>
      </div>
      <MyButton text="Create Event" onClick={() => {}} />
    </div>
  );
};

export default CreateEvent;
