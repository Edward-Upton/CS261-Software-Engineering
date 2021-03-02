import { useState } from "react";
import "./ModeButton.css";

interface Props {
  host: boolean;
  setHost: (v: boolean) => void;
}

/* 
    Sliding button used specifically to allow switching between participating mode
    and hosting mode. The value is controlled by the parent via props.
*/
const ModeButton: React.FC<Props> = ({ host, setHost }) => {
  return (
    <div className="modeBtn__wrapper">
      <div
        className={`modeBtn__highlighter ${
          host ? "modeBtn__highlighter__right" : "modeBtn__highlighter__left"
        }`}
      />
      <div
        className={`modeBtn__option ${
          !host ? "modeBtn__option__sel" : "modeBtn__option__notSel"
        }`}
        onClick={() => setHost(false)}
      >
        Participate
      </div>
      <div
        className={`modeBtn__option ${
          host ? "modeBtn__option__sel" : "modeBtn__option__notSel"
        }`}
        onClick={() => setHost(true)}
      >
        Host
      </div>
    </div>
  );
};

export default ModeButton;
