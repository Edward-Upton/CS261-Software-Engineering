import { useEffect, useState } from "react";
import DateTime from "react-datetime";
import { IUser } from "../types";
import { FieldTypes, IEvent, IField } from "../types";

import { IconContext } from "react-icons";
import {
  BiHappyBeaming,
  BiHappy,
  BiConfused,
  BiSad,
  BiAngry,
} from "react-icons/bi";

import "./EventParticipant.css";

import MyButton from "./MyButton";
import MyTextField from "./MyTextField";
import CreateFields from "./NewField";
import Invite from "./Invite";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { Icon } from "@material-ui/core";

interface FieldProps {
  field: IField;
  sendFeedback: (value: string | number) => Promise<boolean>;
}

// Component for each feedback field to handle user input.
// Allows the user to submit data using inputs that
// correspond to the type of field.
const Field: React.FC<FieldProps> = (props) => {
  // Status message
  const [message, setMessage] = useState<string>("");

  // For textual feedback
  const [text, setText] = useState<string>("");

  // Send the feedback for this field, using the parent's method
  const sendFeedback = async (value: string | number) => {
    setMessage("Submitting");
    const res = await props.sendFeedback(value);
    if (res) {
      setMessage("Submitted");
    } else {
      setMessage("Error when submitting");
    }
  };
  return (
    <div className="eventParticipant__field">
      {/* Field title */}
      <div className="eventParticipant__field__title">{props.field.name}</div>

      <div className="eventParticipant__field__titleSep" />

      {/* Field input */}
      {props.field.fieldType === "mood" && (
        // Mood field type
        <IconContext.Provider
          value={{ className: "eventParticipant__field__moodSelect__emojis" }}
        >
          {/* Emoji selection */}
          <div className="eventParticipant__field__moodSelect">
            <BiAngry onClick={() => sendFeedback(1)} />
            <BiSad onClick={() => sendFeedback(2)} />
            <BiConfused onClick={() => sendFeedback(3)} />
            <BiHappy onClick={() => sendFeedback(4)} />
            <BiHappyBeaming onClick={() => sendFeedback(5)} />
          </div>
        </IconContext.Provider>
      )}
      {props.field.fieldType === "text" && (
        // Text field type
        <>
          {/* Text area */}
          <MyTextField
            type="area"
            placeholder="Enter Text..."
            onChange={(v) => setText(v)}
            value={text}
            styled={{ height: "8.4rem" }}
          />
          {/* Submit button */}
          <MyButton
            onClick={() => sendFeedback(text)}
            styled={{ marginTop: "0.5rem" }}
          >
            Submit
          </MyButton>
        </>
      )}

      {/* Submission status message */}
      <div>{message}</div>
    </div>
  );
};

interface Props {
  user: IUser;
  event: IEvent | null;
  closeClicked: () => void;
}

// Panel for showing user the fields setup by the host for them
// to submit "answers" for as feedback. Shows all the fields as
// well as corresponding input types dependent on the field type.
const EventParticipant: React.FC<Props> = (props) => {
  // Send the feedback to the server to be analysed.
  const sendFeedback = async (fieldId: string, v: string | number) => {
    if (props.event) {
      try {
        const res = await axios.post("/api/event/submit-feedback", {
          eventId: props.event._id,
          userId: props.user._id,
          fieldId,
          data: v,
        });
        const { message } = res.data;
        console.log(message);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  };

  if (props.event) {
    return (
      <div id="eventParticipant">
        <div id="eventParticipant__header">
          {/* Event name */}
          <div id="eventParticipant__header__title">{props.event.name}</div>

          {/* Close button */}
          <IconContext.Provider
            value={{ className: "eventParticipant__header__icon" }}
          >
            <AiOutlineCloseCircle onClick={props.closeClicked} />
          </IconContext.Provider>
        </div>

        {/* Submission feedback fields */}
        <div id="eventParticipant__content">
          <div>
            {props.event.feedback.map((field, i) => {
              return (
                <Field
                  key={i}
                  field={field}
                  sendFeedback={async (value) => {
                    return await sendFeedback(field._id, value);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No Valid Event Data</div>;
  }
};

export default EventParticipant;
