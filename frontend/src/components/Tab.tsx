import React, { CSSProperties, useState } from "react";

import Host from "./Host";
import Participate from "./Participate";

import "./Tab.css";

import { IEvent } from "../types";

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
  const [host, setHost] = useState<boolean>(false);

  return (
    <div className="tab" style={props.styled}>
      <div className="tab__select">
        <div
          className={`tab__option tab__participate ${!host && "tab__selected"}`}
          onClick={() => setHost(false)}
        >
          Participate
        </div>
        <div
          className={`tab__option tab__host ${host && "tab__selected"}`}
          onClick={() => setHost(true)}
        >
          Host
        </div>
      </div>
      <div className="tab__content">
        {host ? (
          <Host user={props.user} />
        ) : (
          <Participate
            user={props.user}
            setEventParticipantOpen={props.setEventParticipantOpen}
            setEventParticipantEvent={props.setEventParticipantEvent}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
