import React, { CSSProperties, useState } from "react";

import Host from "./Host";
import Participate from "./Participate";

import "./Tab.css";

interface Props {
  styled?: CSSProperties;
  user: { _id: string; email: string };
}

// This component is the main content section of the app.
// It features to switchable panes, one for participating
// and the other for hosting events. Within these is the
// relevant content such as event lists and actions.
const Tab: React.FC<Props> = (props) => {
  // Is the host panel open.
  const [host, setHost] = useState<boolean>(false);

  return (
    <div id="tab" style={props.styled}>
      {/* Select tab buttons */}
      <div id="tab__select">
        {/* Participate tab button */}
        <div
          className={`tab__option ${!host && "tab__selected"}`}
          onClick={() => setHost(false)}
        >
          Participate
        </div>

        {/* Host tab button */}
        <div
          className={`tab__option ${host && "tab__selected"}`}
          onClick={() => setHost(true)}
        >
          Host
        </div>
      </div>

      <div id="tab__content">
        {/* Show content for relevant open panel */}
        {host ? <Host user={props.user} /> : <Participate user={props.user} />}
      </div>
    </div>
  );
};

export default Tab;
