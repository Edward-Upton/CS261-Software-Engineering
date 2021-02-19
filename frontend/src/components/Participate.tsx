import { User } from "../App";
import { AiOutlineEye } from "react-icons/ai";

import MyTextField from "./MyTextField";
import MyButton from "./MyButton";

import "./Participate.css";

interface Props {
  user: User;
}

const Participate: React.FC<Props> = ({ user }) => {
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
          onChange={() => {}}
          styled={{ width: "50%" }}
        >
          <AiOutlineEye />
        </MyTextField>
        <MyButton
          text="Join Event"
          onClick={() => {}}
          styled={{ width: "40%", backgroundColor: "#59c9a5" }}
        ></MyButton>
      </div>
    </div>
  );
};

export default Participate;
