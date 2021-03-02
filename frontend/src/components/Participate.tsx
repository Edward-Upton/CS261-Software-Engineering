import { useEffect, useState } from "react";

import { User } from "../types";
import { AiOutlineNumber } from "react-icons/ai";

import MyTextField from "./MyTextField";
import MyButton from "./MyButton";
import EventList from "./EventList";
import EventParticipant from "./EventParticipant";

import "./Participate.css";
import { IEvent } from "../types";
import axios from "axios";

interface Props {
  user: User;
}

// This is the panel to show detail when the user wants
// to participate in events. It displays a list of joined
// events with the time they will be active as well as
// an option to join an event with a code.
const Participate: React.FC<Props> = (props) => {
  // These are for opening and submitting feedback for an event
  const [eventOpen, setEventOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  // Used for joining an event with a code.
  const [codeEntered, setCodeEntered] = useState<string>("");

  // A 'loading' variable to signify when the user is joining an event.
  const [joiningEvent, setJoiningEvent] = useState<boolean>(false);

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
  const joinEvent = async () => {
    setJoiningEvent(true);
    try {
      await axios.post("/api/event/join", {
        userId: props.user._id,
        inviteCode: codeEntered,
      });
    } catch (error) {
      console.log(error);
    }
    setCodeEntered("");
    // Update the list of events
    getEvents();
    setJoiningEvent(false);
  };

  return (
    <div id="participate">
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
          <div id="participate__code">
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
          <EventList
            events={joinedEvents}
            onEventClick={(event) => {
              setSelectedEvent(event);
              setEventOpen(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Participate;
