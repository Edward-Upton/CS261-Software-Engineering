import { CSSProperties } from "react";
import { IEvent } from "../types";

import "./HostEvent.css";

interface Props {
  styled?: CSSProperties;
  event: IEvent;
  key: string;
}

const HostEvent: React.FC<Props> = (props) => {
  const copyEventCode = () => {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", props.event.inviteCode);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };
  return (
    <>
      <div key={props.key} className="event" style={props.styled}>
        <div className="event__name">{props.event.name}</div>
        <div className="event__copyLink" onClick={copyEventCode}>
          Copy Code
        </div>
        <div className="event__time">
          {new Date(props.event.start).toLocaleDateString("en-GB")} to{" "}
          {new Date(props.event.end).toLocaleDateString("en-GB")}
        </div>
      </div>
    </>
  );
};

export default HostEvent;
