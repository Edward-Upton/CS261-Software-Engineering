import React, { CSSProperties, useState } from "react";
import { IEvent } from "../types";

import Host from "./Host";
import Participate from "./Participate";

import "./Tab.css";

interface Props {
  styled?: CSSProperties;
  user: { _id: string; email: string };
  setEventParticipantOpen: () => void;
  setEventParticipantEvent: (event: IEvent) => void;
}

const Header: React.FC<Props> = (props) => {
  const [selected, setSelected] = useState<"participate" | "host">(
    "participate"
  );
  return (
    <div className="tab" style={props.styled}>
      <div className="tab__select">
        <div
          className={`tab__option tab__participate ${
            selected === "participate" ? "tab__selected" : ""
          }`}
          onClick={() => setSelected("participate")}
        >
          Participate
        </div>
        <div
          className={`tab__option tab__host ${
            selected === "host" ? "tab__selected" : ""
          }`}
          onClick={() => setSelected("host")}
        >
          Host
        </div>
      </div>
      <div className="tab__content">
        {selected === "participate" && (
          <Participate
            user={props.user}
            setEventParticipantOpen={props.setEventParticipantOpen}
            setEventParticipantEvent={props.setEventParticipantEvent}
          />
        )}
        {selected === "host" && <Host user={props.user} />}
      </div>
    </div>
  );
};

export default Header;
