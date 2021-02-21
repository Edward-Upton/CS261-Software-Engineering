import { useEffect, useState } from "react";

import { User } from "../App";

import MyButton from "./MyButton";
import HostEvent from "./HostEvent";
import CreateEvent from "./CreateEvent";

import "./Host.css";
import { IEvent } from "../types";
import axios from "axios";

interface Props {
  user: User;
}

const Host: React.FC<Props> = ({ user }) => {
  const [joinedEvents, setJoinedEvents] = useState<IEvent[]>([]);
  const [createEventOpen, setCreateEventOpen] = useState<boolean>(false);

  useEffect(() => {
    getEvents();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {createEventOpen && (
        <CreateEvent closeClicked={() => setCreateEventOpen(false)} />
      )}
      <MyButton
        text="Create Event"
        onClick={() => setCreateEventOpen(true)}
        styled={{ backgroundColor: "#59c9a5" }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "30rem",
          padding: "0.5rem",
          marginTop: "0.5rem",
          // border: "1px solid #465775",
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
            Events Created
          </div>
          {joinedEvents.map((event: IEvent) => (
            <HostEvent key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Host;
