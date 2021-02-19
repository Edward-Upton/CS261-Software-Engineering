import { useEffect, useState } from "react";

import { User } from "../App";

import MyButton from "./MyButton";
import HostEvent from "./HostEvent";

import "./Host.css";
import { IEvent } from "../types";
import axios from "axios";

interface Props {
  user: User;
}

const Host: React.FC<Props> = ({ user }) => {
  const [codeEntered, setCodeEntered] = useState<string>("");
  const [joiningEvent, setJoiningEvent] = useState<boolean>(false);
  const [joinedEvents, setJoinedEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    getEvents();
    return;
  }, []);

  const getEvents = async () => {
    try {
      const res = await axios.get("/api/event/hosting", {
        params: { userId: user._id },
      });
      setJoinedEvents(res.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  const joinEvent = async () => {
    setJoiningEvent(true);
    console.log(codeEntered);
    setJoiningEvent(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <MyButton text="Create Event" onClick={() => {}} />
      <div
        style={{
          width: "100%",
          maxWidth: "30rem",
          padding: "0.5rem",
          marginTop: "0.5rem",
          border: "1px solid #465775",
        }}
      >
        <div style={{ fontSize: "1.2rem", color: "#465775" }}>
          Events Joined
        </div>
        {joinedEvents.map((event: IEvent) => (
          <HostEvent key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Host;
