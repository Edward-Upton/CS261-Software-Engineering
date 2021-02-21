import { useState } from "react";
import { User } from "../App";
import { IField } from "../types";
import "./CreateEvent.css";
import MyButton from "./MyButton";
import MyTextField from "./MyTextField";

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
        <h3>Add Event</h3>
        <h2 onClick={props.closeClicked}>Close</h2>
      </div>
      <div className="createEvent__content">
        <div>
          <MyTextField
            type="text"
            placeholder="Event Name..."
            onChange={(v) => setEventName(v)}
            value={eventName}
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
