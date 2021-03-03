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
import { IoArrowBackCircleOutline } from "react-icons/io5";
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
  const [message, setMessage] = useState<string>("Submit");

  const [num, setNum] = useState<number | null>(null);

  // For textual feedback
  const [text, setText] = useState<string>("");

  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);

  useEffect(() => {
    const type = props.field.fieldType;
    if (type === "mood" || type === "rating" || type === "slider") {
      if (num !== null) {
        setAllowSubmit(true);
        setMessage("Submit");
      } else {
        setAllowSubmit(false);
        setMessage("Enter Feedback");
      }
    } else {
      if (text.length > 0) {
        setAllowSubmit(true);
        setMessage("Submit");
      } else {
        setAllowSubmit(false);
        setMessage("Enter Feedback");
      }
    }
  }, [text, num, props.field.fieldType]);

  // Send the feedback for this field, using the parent's method
  const sendFeedback = async () => {
    setMessage("Submitting");
    const value: any =
      props.field.fieldType === "mood" ||
      props.field.fieldType === "rating" ||
      props.field.fieldType === "slider"
        ? num
        : text;
    const res = await props.sendFeedback(value);
    if (res) {
      setMessage("Submitted");
      setNum(null);
      setText("");
    } else {
      setMessage("Try Again");
    }
  };
  return (
    <div className="eventParticipant__field">
      {/* Field title */}
      <div className="eventParticipant__field__title">{props.field.name}</div>

      {/* Field input */}
      {props.field.fieldType === "mood" && (
        // Mood field type
        // Emoji selection
        <div className="eventParticipant__field__moodSelect">
          <IconContext.Provider
            value={{
              className: `eventParticipant__field__moodSelect__emojis ${
                num === 1
                  ? "eventParticipant__field__moodSelect__emojis__selected"
                  : ""
              }`,
            }}
          >
            <BiAngry onClick={() => (num !== 1 ? setNum(1) : setNum(null))} />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              className: `eventParticipant__field__moodSelect__emojis ${
                num === 2
                  ? "eventParticipant__field__moodSelect__emojis__selected"
                  : ""
              }`,
            }}
          >
            <BiSad onClick={() => (num !== 2 ? setNum(2) : setNum(null))} />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              className: `eventParticipant__field__moodSelect__emojis ${
                num === 3
                  ? "eventParticipant__field__moodSelect__emojis__selected"
                  : ""
              }`,
            }}
          >
            <BiConfused
              onClick={() => (num !== 3 ? setNum(3) : setNum(null))}
            />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              className: `eventParticipant__field__moodSelect__emojis ${
                num === 4
                  ? "eventParticipant__field__moodSelect__emojis__selected"
                  : ""
              }`,
            }}
          >
            <BiHappy onClick={() => (num !== 4 ? setNum(4) : setNum(null))} />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              className: `eventParticipant__field__moodSelect__emojis ${
                num === 5
                  ? "eventParticipant__field__moodSelect__emojis__selected"
                  : ""
              }`,
            }}
          >
            <BiHappyBeaming
              onClick={() => (num !== 5 ? setNum(5) : setNum(null))}
            />
          </IconContext.Provider>
        </div>
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
        </>
      )}

      {/* Submit button */}
      <MyButton
        disabled={!allowSubmit}
        fontSize="1.2rem"
        textColour="#336666"
        onClick={sendFeedback}
        styled={{
          marginTop: "0.5rem",
          width: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          backgroundColor: "white",
          borderRadius: "4rem",
        }}
      >
        {message}
      </MyButton>
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
      <div className="eventParticipant">
        <div className="eventParticipant__header">
          {/* Event name */}
          <div className="eventParticipant__header__title">
            {props.event.name}
          </div>

          {/* Close button */}
          <IconContext.Provider
            value={{ className: "eventParticipant__header__icon" }}
          >
            <IoArrowBackCircleOutline onClick={props.closeClicked} />
          </IconContext.Provider>
        </div>

        {/* Submission feedback fields */}
        <div className="eventParticipant__content">
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
