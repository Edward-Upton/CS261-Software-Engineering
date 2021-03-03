import React, { CSSProperties } from "react";
import { IEvent } from "../types";

import "./EventList.css";
import MyButton from "./MyButton";

interface ItemProps {
  styled?: CSSProperties;
  host?: boolean;
  event: IEvent;
  onClick: () => void;
}

// Component for each event item for the list. This will
// render differently depending on whether the list is
// for participating events and host events. This component
// will render the name of the event, the copy code link if
// rendering for host, and the date the event is active.
const EventItem: React.FC<ItemProps> = (props) => {
  // Copies the event code to the user's clipboard.
  const copyEventCode = () => {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", props.event.inviteCode);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  return (
    <div
      key={props.event._id}
      className="eventItem__wrapper"
      style={props.styled}
    >
      {/* Event name */}
      <div className="eventItem__details" onClick={props.onClick}>
        <div className="eventItem__name">{props.event.name}</div>
        <div className="eventItem__type">{props.event.eventType}</div>
      </div>

      {/* If for hosting, copy link button */}
      {props.host && (
        <MyButton
          text="Copy Invite Code"
          fontSize="0.8rem"
          onClick={copyEventCode}
          styled={{ width: "5rem", backgroundColor: "#C48227", marginRight: "0.5rem"}}
        />
      )}

      {/* Event date */}
      <div className="eventItem__time">
        <div>{new Date(props.event.start).toLocaleDateString("en-GB")}</div>
        <div>to</div>
        <div>{new Date(props.event.end).toLocaleDateString("en-GB")}</div>
      </div>
    </div>
  );
};

interface Props {
  events: IEvent[];
  host?: boolean;
  onEventClick: (event: IEvent) => void;
}

// Component that shows a list of events. This can be used
// for either participating events or hosting events and will
// change how the events appear accordingly. Handles overflowing
// with scrolling.
const EventList: React.FC<Props> = (props) => {
  return (
    <div className="eventList">
      <div>
        <div className="eventList__title">
          {props.host ? "Events Created" : "Events Joined"}
        </div>
        {props.events.map((event: IEvent) => (
          <EventItem
            key={event._id}
            event={event}
            host={props.host}
            onClick={() => props.onEventClick(event)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
