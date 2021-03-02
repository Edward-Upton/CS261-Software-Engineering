import { CSSProperties } from "react";

import MyButton from "./MyButton";

import "./Header.css";

interface Props {
  styled?: CSSProperties;
  email?: string;
  logout: () => void;
}

// This shows the user's email and a logout button
const Header: React.FC<Props> = (props) => {
  return (
    <div className="header" style={props.styled}>
      <div className="header__email">Hello {props.email?.split("@")[0]}!</div>
      <MyButton
        text="Logout"
        fontSize="1rem"
        onClick={() => props.logout}
        styled={{ backgroundColor: "#C48227", height: "1.4rem", width: "5rem" }}
      />
    </div>
  );
};

export default Header;
