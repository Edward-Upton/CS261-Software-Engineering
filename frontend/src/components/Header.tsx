import { CSSProperties } from "react";

import MyButton from "./MyButton";
import ModeButton from "./ModeButton";

import "./Header.css";

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
      <MyButton
        fontSize="1rem"
        onClick={() => {
          if (window.confirm("Do you want to logout?")) props.logout();
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
        Hello {props.user.email?.split("@")[0]}
      </MyButton>

      <ModeButton tab={props.tab} setTab={props.setTab} />
    </div>
  );
};

export default Header;
