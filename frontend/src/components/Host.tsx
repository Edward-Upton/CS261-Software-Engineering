import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

import MyButton from "./MyButton";
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";

import "./Host.css";

import { IUser, IEvent } from "../types";
import EventHost from "./EventHost";

const SOCKET_URI = "ws://localhost:5000";

interface Props {
  user: IUser;
}

// This is the panel to show detail when the user wants
// to host events. It displays a list of created events
// with the time they will be active and a button to copy
// the event code for sharing with participants. There is
// also a button to create a new event.
const Host: React.FC<Props> = ({ user }) => {
  // These are for opening and viewing feedback for an event
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  // List of all created events for this user.
  const [events, setEvents] = useState<IEvent[]>([]);

  // Determines if the event creation window is open.
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  // On first render get the events created by the user.
  useEffect(() => {
    if (!user) return;
    getEvents();
    const socket = io(SOCKET_URI, { auth: user });
    socket.on("eventUpdate", (data: any) => {
      setEvents(
        events.map((event: IEvent) => {
          return event._id === data.event._id ? data.event : event;
        })
      );
      if (selectedEvent?._id === data.event._id) setSelectedEvent(data.event);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedEvent]);

  // Get all events created by the user.
  const getEvents = async () => {
    const response = await axios.get(`/api/event/hosting/${user._id}`);
    setEvents(response.data.events);
  };

  return (
    <div className="host">
      {selectedEvent ? (
        <EventHost
          user={user}
          event={selectedEvent}
          closeClicked={() => {
            setSelectedEvent(null);
          }}
        />
      ) : createOpen ? (
        <CreateEvent
          user={user}
          closeClicked={() => {
            setCreateOpen(false);
            getEvents();
          }}
        />
      ) : (
        <>
          <div className="eventList__title">Events Created</div>
          <EventList
            events={events}
            host={true}
            onEventClick={(event) => {
              setSelectedEvent(event);
            }}
          />
          <MyButton
            onClick={() => setCreateOpen(true)}
            styled={{ backgroundColor: "#C48227", marginTop: "0.8rem" }}
          >
            Create Event
          </MyButton>
        </>
      )}
    </div>
  );
};

export default Host;
