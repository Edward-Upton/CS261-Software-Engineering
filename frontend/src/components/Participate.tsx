import { useState } from "react";

import { User } from "../App";
import { AiOutlineEye } from "react-icons/ai";

import MyTextField from "./MyTextField";
import MyButton from "./MyButton";

import "./Participate.css";

interface Props {
  user: User;
}

const Participate: React.FC<Props> = ({ user }) => {
  const [codeEntered, setCodeEntered] = useState<string>("");
  const [joiningEvent, setJoiningEvent] = useState<boolean>(false);

  const joinEvent = async () => {
    setJoiningEvent(true);
    console.log(codeEntered);
    setJoiningEvent(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div className="participate__code">
        <MyTextField
          type="text"
          placeholder="Code..."
          value={codeEntered}
          onChange={(v) => setCodeEntered(v)}
          styled={{ width: "50%" }}
        >
          <AiOutlineEye />
        </MyTextField>
        <MyButton
          text={joiningEvent ? "Joining" : "Join Event"}
          onClick={joinEvent}
          styled={{ width: "40%", backgroundColor: "#59c9a5" }}
          disabled={joiningEvent}
        ></MyButton>
      </div>
    </div>
  );
};

export default Participate;
