import React, { CSSProperties, useState } from "react";

import Host from "./Host";
import Participant from "./Participant";

import "./Tab.css";

interface Props {
  styled?: CSSProperties;
  user: { _id: string; email: string };
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
      {selected === "participate" && <Participant user={props.user} />}
      {selected === "host" && <Host user={props.user} />}
    </div>
  );
};

export default Header;
