import { useEffect, useState } from "react";

import { IUser } from "../types";

import MyButton from "./MyButton";
import EventList from "./EventList";
import EventParticipant from "./EventParticipant";
import InviteCode from "./InviteCode";

import "./Participate.css";
import { IEvent } from "../types";
import axios from "axios";

interface Props {
  user: IUser;
}

// This is the panel to show detail when the user wants
// to participate in events. It displays a list of joined
// events with the time they will be active as well as
// an option to join an event with a code.
const Participate: React.FC<Props> = (props) => {
  // These are for opening and submitting feedback for an event
  const [eventOpen, setEventOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  // List of all joined events for the user.
  const [joinedEvents, setJoinedEvents] = useState<IEvent[]>([]);

  // Gets the user's joined events and updates the state variable, which
  // causes the list to update with any changes.
  const getEvents = async () => {
    try {
      const res = await axios.get("/api/event/participating/" + props.user._id);
      setJoinedEvents(res.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  // On first render, get the events for the user.
  useEffect(() => {
    getEvents();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Join an event using the code entered.
  const joinEvent = async (eventCode: string) => {
    try {
      await axios.post("/api/event/join", {
        userId: props.user._id,
        inviteCode: eventCode,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    // Update the list of events
    getEvents();
    return true;
  };

  return (
    <div className="participate">
      {eventOpen && selectedEvent ? (
        // If an event has been clicked on, show the feedback,
        // submission panel.
        <EventParticipant
          user={props.user}
          event={selectedEvent}
          closeClicked={() => {
            setEventOpen(false);
            setSelectedEvent(null);
          }}
        />
      ) : (
        // If no event has been clicked on, show the list of
        // events joined and the invite code field and joining.
        <>

          {/* List of joined events */}
          <EventList
            events={joinedEvents}
            onEventClick={(event) => {
              setSelectedEvent(event);
              setEventOpen(true);
            }}
          />
          {/* Invite code entering for joining events */}
          <InviteCode joinEvent={joinEvent} />
        </>
      )}
    </div>
  );
};

export default Participate;
