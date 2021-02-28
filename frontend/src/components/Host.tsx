import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

import MyButton from "./MyButton";
import HostEvent from "./HostEvent";
import CreateEvent from "./CreateEvent";

import "./Host.css";

import { User, IEvent } from "../types";

const SOCKET_URI = "ws://localhost:5000";

interface Props {
  user: User;
  setEventHostOpen: () => void;
  setEventHostEvent: (event: IEvent) => void;
}

const Host: React.FC<Props> = (props) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/event/hosting/${props.user._id}`);
      setEvents(response.data.events);
    })();
  }, [props.user._id]);

  const getEvents = async () => {
    const response = await axios.get(`/api/event/hosting/${props.user._id}`);
    setEvents(response.data.events);
  };

  return (
    <div id="host">
      {createOpen && (
        <CreateEvent
          user={props.user}
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
            <HostEvent
              key={event._id}
              event={event}
              onClick={() => {
                props.setEventHostEvent(event);
                props.setEventHostOpen();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Host;
