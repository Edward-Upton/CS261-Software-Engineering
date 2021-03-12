import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineNumber } from "react-icons/ai";

import "./InviteCode.css";
import MyButton from "./MyButton";

interface Props {
  joinEvent: (code: string) => void;
}

// Component used for participants to enter invite code
// to join an event. Features text box with button adjacent.
const InviteCode: React.FC<Props> = (props) => {
  const [eventCode, setEventCode] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventCode(e.target.value);
  };

  return (
      <div className="inviteCode">
        {/* Code Input */}
        <input
          type="text"
          placeholder="# Enter Invite Code..."
          value={eventCode}
          onChange={onChange}
          className="inviteCode__input"
        ></input>

        {/* Join Button */}
        <MyButton
          fontSize="1rem"
          onClick={() => props.joinEvent(eventCode)}
          styled={{
            borderRadius: "1rem",
            width: "6rem",
            height: "1.8rem",
            backgroundColor: "#EE862F",
          }}
        >
          Join
        </MyButton>
      </div>
  );
};

export default InviteCode;
