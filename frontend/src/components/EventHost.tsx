import { useEffect, useState } from "react";
import DateTime from "react-datetime";
import { User } from "../types";
import { FieldTypes, IEvent, IField } from "../types";
import { io, Socket } from "socket.io-client";
import ReactWordcloud from 'react-wordcloud';

import { IconContext } from "react-icons";
import {
  BiHappyBeaming,
  BiHappy,
  BiConfused,
  BiSad,
  BiAngry,
} from "react-icons/bi";

import "./EventHost.css";

import MyButton from "./MyButton";
import MyTextField from "./MyTextField";
import CreateFields from "./CreateFields";
import Invite from "./Invite";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { Icon } from "@material-ui/core";

const SOCKET_URI = "ws://localhost:5000";

interface FieldProps {
  field: IField;
}

const Field: React.FC<FieldProps> = (props) => {
  return (
    <div className="eventHost__field">
      <div className="eventHost__field__title">{props.field.name}</div>
      <div className="eventHost__field__titleSep" />
      {props.field.fieldType === "mood" && (
        <IconContext.Provider
          value={{ className: "eventHost__field__moodSelect__emojis" }}
        >
          <div>{props.field.data?.num}</div>
        </IconContext.Provider>
      )}
      {props.field.fieldType === "text" && <>{props.field.data?.num}</>}
    </div>
  );
};

interface Props {
  user: User;
  event: IEvent | null;
  closeClicked: () => void;
  setEventHostEvent: (event: IEvent) => void;
}

const EventHost: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.user) return;
    const socket = io(SOCKET_URI, { auth: props.user });
    socket.on("eventUpdate", (data: any) => {
      props.setEventHostEvent(data.event);
    });
    return () => {
      socket.disconnect();
    };
  }, [props]);

  useEffect(() => {
    console.log("EVENT:", props.event);
  }, [props.event]);

  if (props.event) {
    return (
      <div className="eventHost">
        <div className="eventHost__header">
          <div className="eventHost__header__title">{props.event.name}</div>
          <IconContext.Provider
            value={{ className: "eventHost__header__icon" }}
          >
            <AiOutlineCloseCircle onClick={props.closeClicked} />
          </IconContext.Provider>
        </div>
        <div className="eventHost__content">
          <div>
            {props.event.feedback.map((field, i) => {
              return <Field key={i} field={field} />;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No Valid Event Data</div>;
  }
};

export default EventHost;
