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
          <DateTime
            onChange={(value) => {
              if (typeof value === "string") {
                setEventStart(new Date(value));
              }
            }}
            value={eventStart}
          />
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
