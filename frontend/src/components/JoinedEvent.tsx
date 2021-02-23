import { CSSProperties } from "react";
import { IEvent } from "../types";

import "./JoinedEvent.css";

interface Props {
  styled?: CSSProperties;
  event: IEvent;
}

const JoinedEvent: React.FC<Props> = (props) => {
  return (
    <div key={props.event._id} className="event" style={props.styled}>
      <div className="event__name">{props.event.name}</div>
      <div className="event__time">
        {new Date(props.event.start).toLocaleDateString("en-GB")} to{" "}
        {new Date(props.event.end).toLocaleDateString("en-GB")}
      </div>
    </div>
  );
};

export default JoinedEvent;
