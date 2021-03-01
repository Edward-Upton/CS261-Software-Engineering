import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

import MyButton from "./MyButton";
import HostEvent from "./HostEvent";
import CreateEvent from "./CreateEvent";

import "./Host.css";

import { User, IEvent } from "../types";
import EventHost from "./EventHost";

const SOCKET_URI = "ws://localhost:5000";

interface Props {
  user: User;
}

const Host: React.FC<Props> = (props) => {
  const [eventOpen, setEventOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const [events, setEvents] = useState<IEvent[]>([]);
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/event/hosting/${props.user._id}`);
      setEvents(response.data.events);
    })();
  }, [props.user._id]);

  useEffect(() => {
    if (!props.user) return;
    const socket = io(SOCKET_URI, { auth: props.user });
    socket.on("eventUpdate", (data: any) => {
      var tempEvents = [...events];
      tempEvents.map((event, i) => {
        if (event._id === data.event._id) {
          return data.event;
        } else {
          return event;
        }
      });
      setEvents(tempEvents);
      if (selectedEvent?._id === data.event._id) {
        setSelectedEvent(data.event);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [events, props.user, selectedEvent?._id]);

  const getEvents = async () => {
    const response = await axios.get(`/api/event/hosting/${props.user._id}`);
    setEvents(response.data.events);
  };

  return (
    <div id="host">
      {eventOpen && selectedEvent ? (
        <EventHost
          user={props.user}
          event={selectedEvent}
          closeClicked={() => {
            setEventOpen(false);
            setSelectedEvent(null);
          }}
        />
      ) : (
        <>
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
                    setSelectedEvent(event);
                    setEventOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Host;
