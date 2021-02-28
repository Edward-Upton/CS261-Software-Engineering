import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

import MyButton from "./MyButton";
import HostEvent from "./HostEvent";
import CreateEvent from "./CreateEvent";

import "./Host.css";

import { User, IEvent } from "../types";

const SOCKET_URI = "ws://localhost:5000";

interface Props {
  user: User;
}

const Host: React.FC<Props> = ({ user }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/event/hosting/${user._id}`);
      setEvents(response.data.events);
    })();
  }, [user._id]);

  useEffect(() => {
    if (!user) return;
    const socket = io(SOCKET_URI, { auth: user });
    return () => {
      socket.disconnect();
    };
  }, [user]);

  const getEvents = async () => {
    const response = await axios.get(`/api/event/hosting/${user._id}`);
    setEvents(response.data.events);
  };

  return (
    <div id="host">
      {createOpen && (
        <CreateEvent
          user={user}
          closeClicked={() => {
            setCreateOpen(false);
            getEvents();
          }}
        />
      )}
      <MyButton
        text="Create Event"
        onClick={() => setCreateOpen(true)}
        styled={{ backgroundColor: "#59c9a5" }}
      />
      <div id="host-outer">
        <div id="host-inner">
          <div style={{ fontSize: "1.2rem", color: "#465775" }}>
            Events Created
          </div>
          {events.map((event: IEvent) => (
            <HostEvent key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Host;
