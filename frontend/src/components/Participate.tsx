import { useEffect, useState } from "react";

import { User } from "../App";
import { AiOutlineNumber } from "react-icons/ai";

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

  const getEvents = async () => {
    try {
      const res = await axios.get("/api/event/participating/" + user._id);
      setJoinedEvents(res.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinEvent = async () => {
    setJoiningEvent(true);
    try {
      await axios.post("/api/event/join", {
        userId: user._id,
        inviteCode: codeEntered,
      });
    } catch (error) {
      console.log(error);
    }
    setCodeEntered("");
    getEvents();
    setJoiningEvent(false);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-evenly",
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
          <AiOutlineNumber />
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
          padding: "0.5rem",
          marginTop: "0.5rem",
          // border: "1px solid #465775",
          position: "relative",
          overflowY: "hidden",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "auto",
          }}
        >
          <div style={{ fontSize: "1.2rem", color: "#465775" }}>
            Events Joined
          </div>
          {joinedEvents.map((event: IEvent) => (
            <JoinedEvent key={event._id} event={event} />
          ))}
          {/* {joinedEvents.map((event: IEvent) => (
            <JoinedEvent key={event._id} event={event} />
          ))}
          {joinedEvents.map((event: IEvent) => (
            <JoinedEvent key={event._id} event={event} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Participate;
