import { useEffect, useState } from "react";

import { User } from "../App";
import { AiOutlineEye } from "react-icons/ai";

import MyTextField from "./MyTextField";
import MyButton from "./MyButton";
import JoinedEvent from "./JoinedEvent";

import "./Participate.css";
import { IEvent } from "../types";
import axios from "axios";

interface Props {
  user: User;
}

const Participate: React.FC<Props> = ({ user }) => {
  const [codeEntered, setCodeEntered] = useState<string>("");
  const [joiningEvent, setJoiningEvent] = useState<boolean>(false);
  const [joinedEvents, setJoinedEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    getEvents();
    return;
  }, []);

  const getEvents = async () => {
    try {
      const res = await axios.get("/api/event", {
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
      <div className="participate__code">
        <MyTextField
          type="text"
          placeholder="Code..."
          value={codeEntered}
          onChange={(v) => setCodeEntered(v)}
          styled={{ width: "50%" }}
        >
          <AiOutlineEye />
        </MyTextField>
        <MyButton
          text={joiningEvent ? "Joining" : "Join Event"}
          onClick={joinEvent}
          styled={{ width: "40%", backgroundColor: "#59c9a5" }}
          disabled={joiningEvent}
          fontSize="1.2rem"
        ></MyButton>
      </div>
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
          <JoinedEvent key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Participate;
