import React, { CSSProperties, useState } from "react";

import Host from "./Host";
import ModeButton from "./ModeButton";
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
    <>
      <ModeButton host={host} setHost={(v) => setHost(v)} />
      {/* Show content for relevant open panel */}
      {host ? <Host user={props.user} /> : <Participate user={props.user} />}
    </>
  );
};

export default Tab;
