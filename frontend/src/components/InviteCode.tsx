import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineNumber } from "react-icons/ai";

import "./InviteCode.css";
import MyButton from "./MyButton";

interface Props {
  joinEvent: (code: string) => void;
}

const InviteCode: React.FC<Props> = (props) => {
  const [eventCode, setEventCode] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventCode(e.target.value);
  };

  return (
    <IconContext.Provider value={{ className: "inviteCode__icon" }}>
      <div className="inviteCode">
        {/* // Render text field with icon and seperation line */}
        <AiOutlineNumber />
        <div className="inviteCode__sepLine" />
        <input
          type="text"
          placeholder="Event Code..."
          value={eventCode}
          onChange={onChange}
          className="inviteCode__input"
        ></input>
        <MyButton
          text="Join"
          fontSize="1rem"
          onClick={() => props.joinEvent(eventCode)}
          styled={{
            borderRadius: "1rem",
            width: "6rem",
            height: "1.8rem",
            backgroundColor: "#c48227",
          }}
        />
      </div>
    </IconContext.Provider>
  );
};

export default InviteCode;
