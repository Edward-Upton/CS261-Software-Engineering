import { CSSProperties } from "react";

import MyButton from "./MyButton";
import ModeButton from "./ModeButton";

import "./Header.css";

interface Props {
  styled?: CSSProperties;
  email?: string;
  logout: () => void;
  host: boolean;
  setHost: (v: boolean) => void;
}

// This shows the user's email and a logout button
const Header: React.FC<Props> = (props) => {
  return (
    <div className="header" style={props.styled}>
      <MyButton
        text={`Hello ${props.email?.split("@")[0]}`}
        fontSize="1.1rem"
        onClick={() => {
          if (window.confirm("Do you want to logout?")) {
            props.logout()
          }
        }}
        styled={{ backgroundColor: "#C48227", height: "1.4rem", width: "8rem" }}
      />

      <ModeButton host={props.host} setHost={props.setHost} />
    </div>
  );
};

export default Header;
