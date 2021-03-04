import { useEffect, useState } from "react";
import DateTime from "react-datetime";
import { IUser } from "../types";
import { FieldTypes, IEvent, IField } from "../types";
import { IconContext } from "react-icons";

import "./EventParticipant.css";

import MyButton from "./MyButton";
import MyTextField from "./MyTextField";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from "axios";
import { Icon } from "@material-ui/core";
import MoodSubmitting from "./MoodSubmitting";

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
  const [inLimit, setInLimit] = useState<boolean>(false);

  useEffect(() => {
    const type = props.field.fieldType;
    if (!inLimit) {
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
    } else {
      if (num || text.length > 0 || message === "On Submission Cooldown") {
        setMessage("On Submission Cooldown");
        setNum(null);
        setText("");
      } else {
        setMessage("Submitted");
      }
    }
  }, [text, num, props.field.fieldType, inLimit, message]);

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
      setNum(null);
      setText("");
      setInLimit(true);
      setTimeout(() => {
        setInLimit(false);
        setMessage("Enter Feedback");
      }, 1000 * (props.field.constraints.limit ? props.field.constraints.limit : 0));
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
        <MoodSubmitting num={num} setNum={(v) => setNum(v)} />
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
            styled={{ height: "8.4rem", border: "none" }}
          />
        </>
      )}

      {/* Submit button */}
      <MyButton
        disabled={!allowSubmit || inLimit}
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
