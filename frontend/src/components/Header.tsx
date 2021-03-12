import { CSSProperties } from "react";

import MyButton from "./MyButton";
import ModeButton from "./ModeButton";

import { BiUserCircle } from "react-icons/bi";

import "./Header.css";
import { IconContext } from "react-icons/lib";

import { IUser } from "../types";

interface Props {
  styled?: CSSProperties;
  user: IUser;
  logout: () => void;
  tab: boolean;
  setTab: React.Dispatch<React.SetStateAction<boolean>>;
}

// This shows the user's email and a logout button
const Header: React.FC<Props> = (props) => {
  return (
    <div className="header" style={props.styled}>
      {/* Logout Button with Username */}
      <MyButton
        fontSize="1rem"
        onClick={() => {
          if (window.confirm("Do you want to logout?")) props.logout();
        }}
        styled={{
          backgroundColor: "#EE862F",
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
          {props.user.email.split("@")[0]}
        </div>
      </MyButton>
      
      {/* Mode Switching Button */}
      <ModeButton tab={props.tab} setTab={props.setTab} />
    </div>
  );
};

export default Header;
