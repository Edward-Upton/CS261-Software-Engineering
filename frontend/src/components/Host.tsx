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
const Host: React.FC<Props> = (props) => {
  // These are for opening and viewing feedback for an event
  const [eventOpen, setEventOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  // List of all created events for this user.
  const [events, setEvents] = useState<IEvent[]>([]);

  // Determines if the event creation window is open.
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  // On first render get the events created by the user.
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/event/hosting/${props.user._id}`);
      setEvents(response.data.events);
    })();
  }, [props.user._id]);

  // On first render, setup a socket with the server to listen to
  // changes with feedback for events so that they can be views
  // in "real time".
  useEffect(() => {
    if (!props.user) return;
    // Create the socket
    const socket = io(SOCKET_URI, { auth: props.user });
    // On receiving the event update, replace the old event data
    // with the new data.
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
      // Also update the event selected for the feedback viewing panel,
      // this will cause the component to render with the latest data.
      if (selectedEvent?._id === data.event._id) {
        setSelectedEvent(data.event);
      }
    });
    return () => {
      // When this component is unmounted, disconnect the socket
      socket.disconnect();
    };
  }, [events, props.user, selectedEvent?._id]);

  // Get all events created by thte user.
  const getEvents = async () => {
    const response = await axios.get(`/api/event/hosting/${props.user._id}`);
    setEvents(response.data.events);
  };

  return (
    <div id="host">
      {eventOpen && selectedEvent ? (
        // Event is selected and feedback viewing open
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
          {createOpen ? (
            // Event creation panel is open
            <CreateEvent
              user={props.user}
              closeClicked={() => {
                setCreateOpen(false);
                getEvents();
              }}
            />
          ) : (
            // Show list of user's events
            <>
              {/* Created events list */}
              <EventList
                events={events}
                host={true}
                onEventClick={(event) => {
                  setSelectedEvent(event);
                  setEventOpen(true);
                }}
              />

              {/* Create event button */}
              <MyButton
                onClick={() => setCreateOpen(true)}
                styled={{ backgroundColor: "#C48227", marginTop: "0.8rem" }}
              >
                Create Event
              </MyButton>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Host;
