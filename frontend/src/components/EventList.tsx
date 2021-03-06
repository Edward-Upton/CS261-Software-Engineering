import React, { CSSProperties, useEffect, useState } from "react";
import { IEvent } from "../types";
import ReactTooltip from "react-tooltip";

import "./EventList.css";
import MyButton from "./MyButton";

interface ItemProps {
  styled?: CSSProperties;
  host?: boolean;
  event: IEvent;
  onClick: () => void;
}

const getDateTime = (date: Date): string => {
  return date.toLocaleTimeString("en-GB").replace(/(.*)\D\d+/, "$1");
};

// Component for each event item for the list. This will
// render differently depending on whether the list is
// for participating events and host events. This component
// will render the name of the event, the copy code link if
// rendering for host, and the date the event is active.
const EventItem: React.FC<ItemProps> = (props) => {
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [eventActive, setEventActive] = useState<boolean>(false);
  const [eventFinished, setEventFinished] = useState<boolean>(false);
  const [startOnToday, setStartOnToday] = useState<boolean>(false);
  const [endOnToday, setEndOnToday] = useState<boolean>(false);

  const [justCopiedCode, setJustCopiedCode] = useState<boolean>(false);

  useEffect(() => {
    setDate(new Date());
    let secTimer = setInterval(() => {
      setDate(new Date());
    }, 1000 * 60);
    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    setEventActive(date > startDate && date < endDate ? true : false);
    setEventFinished(date > endDate ? true : false);
    setStartOnToday(date.getDate() === startDate.getDate() ? true : false);
    setEndOnToday(date.getDate() === endDate.getDate() ? true : false);
  }, [date, startDate, endDate]);

  useEffect(() => {
    setStartDate(new Date(props.event.start));
    setEndDate(new Date(props.event.end));
  }, [props.event.start, props.event.end]);

  // Copies the event code to the user's clipboard.
  const copyEventCode = () => {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", props.event.inviteCode);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    setJustCopiedCode(true);
    setTimeout(() => {
      setJustCopiedCode(false);
    }, 2000);
  };

  return (
    <div
      key={props.event._id}
      className={`eventItem__wrapper ${
        eventActive || (props.host && eventFinished)
          ? "eventItem__wrapper__selectable"
          : ""
      }`}
      style={props.styled}
      onClick={
        eventActive || (eventFinished && props.host) ? props.onClick : () => {}
      }
    >
      {/* Event name */}
      <div className="eventItem__details">
        <div className="eventItem__name">{props.event.name}</div>
        <div className="eventItem__type">{props.event.eventType}</div>
      </div>

      {/* If for hosting, copy link button */}
      {props.host && !eventFinished && (
        <MyButton
          fontSize="0.7rem"
          onClick={copyEventCode}
          styled={{
            width: "5rem",
            backgroundColor: "#C48227",
            marginRight: "0.5rem",
          }}
        >
          {justCopiedCode ? "Copied" : "Copy Invite Code"}
        </MyButton>
      )}

      {/* Event date */}
      <div
        className="eventItem__activeStatus"
        data-tip
        data-for={`dateTip${props.event._id}`}
      >
        {eventActive ? "Started" : eventFinished ? "Finished" : "Not Started"}
      </div>
      <ReactTooltip id={`dateTip${props.event._id}`}>
        <div className="eventItem__time">
          <div>
            {startOnToday
              ? `Today at ${getDateTime(startDate)}`
              : `${startDate.toLocaleDateString("en-GB")} at ${getDateTime(
                  startDate
                )}`}
          </div>
          <div>to</div>
          <div>
            {endOnToday
              ? `Today at ${getDateTime(endDate)}`
              : `${endDate.toLocaleDateString("en-GB")} at ${getDateTime(
                  endDate
                )}`}
          </div>
        </div>
      </ReactTooltip>
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
