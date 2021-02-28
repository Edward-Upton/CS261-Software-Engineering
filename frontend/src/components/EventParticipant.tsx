import { useEffect, useState } from "react";
import DateTime from "react-datetime";
import { User } from "../types";
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
import CreateFields from "./CreateFields";
import Invite from "./Invite";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { Icon } from "@material-ui/core";

interface FieldProps {
  field: IField;
  sendFeedback: (value: string | number) => Promise<boolean>;
}

const Field: React.FC<FieldProps> = (props) => {
  const [message, setMessage] = useState<string>("");
  const [text, setText] = useState<string>("");
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
      <div className="eventParticipant__field__title">{props.field.name}</div>
      <div className="eventParticipant__field__titleSep" />
      {props.field.fieldType === "mood" && (
        <IconContext.Provider
          value={{ className: "eventParticipant__field__moodSelect__emojis" }}
        >
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
        <div>
          <MyTextField
            type="area"
            placeholder="Enter Text..."
            onChange={(v) => setText(v)}
            value={text}
            styled={{ height: "8.4rem" }}
          />
          <MyButton text="Submit" onClick={() => sendFeedback(text)} />
        </div>
      )}
      <div>{message}</div>
    </div>
  );
};

interface Props {
  user: User;
  event: IEvent | null;
  closeClicked: () => void;
}

const EventParticipant: React.FC<Props> = (props) => {
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
          <div className="eventParticipant__header__title">
            {props.event.name}
          </div>
          <IconContext.Provider
            value={{ className: "eventParticipant__header__icon" }}
          >
            <AiOutlineCloseCircle onClick={props.closeClicked} />
          </IconContext.Provider>
        </div>
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
