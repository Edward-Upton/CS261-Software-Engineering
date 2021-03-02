import React, { CSSProperties } from "react";
import { IEvent } from "../types";

import "./EventList.css";

interface ItemProps {
  styled?: CSSProperties;
  host?: boolean;
  event: IEvent;
  onClick: () => void;
}

const EventItem: React.FC<ItemProps> = (props) => {
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
      onClick={props.onClick}
      className="eventItem"
      style={props.styled}
    >
      <div className="eventItem__name">{props.event.name}</div>
      {props.host && (
        <div className="eventItem__copyLink" onClick={copyEventCode}>
          Copy Code
        </div>
      )}
      <div className="eventItem__time">
        {new Date(props.event.start).toLocaleDateString("en-GB")} to{" "}
        {new Date(props.event.end).toLocaleDateString("en-GB")}
      </div>
    </div>
  );
};

interface Props {
  events: IEvent[];
  host?: boolean;
  onEventClick: (event: IEvent) => void;
}

const EventList: React.FC<Props> = (props) => {
  return (
    <div className="eventList">
      <div>
        <div style={{ fontSize: "1.2rem", color: "#465775" }}>
          Events Joined
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
