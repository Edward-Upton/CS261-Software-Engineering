import { CSSProperties } from "react";

import MyButton from "./MyButton";
import ModeButton from "./ModeButton";

import { BiUserCircle } from "react-icons/bi";

import "./Header.css";
import { IconContext } from "react-icons/lib";

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
        fontSize="1rem"
        onClick={() => {
          if (window.confirm("Do you want to logout?")) {
            props.logout();
          }
        }}
        styled={{
          backgroundColor: "#C48227",
          height: "2rem",
          width: "auto",
          maxWidth: "40%",
          borderRadius: "1rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        <div className="header__email">
          <IconContext.Provider value={{ className: "header__userIcon" }}>
            <BiUserCircle />
          </IconContext.Provider>
          {props.email?.split("@")[0]}
        </div>
      </MyButton>

      <ModeButton host={props.host} setHost={props.setHost} />
    </div>
  );
};

export default Header;
