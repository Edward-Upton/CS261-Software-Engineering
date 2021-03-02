import { CSSProperties } from "react";

import "./Header.css";

interface Props {
  styled?: CSSProperties;
  email?: string;
  logout: () => void;
}

// This shows the user's email and a logout button
const Header: React.FC<Props> = (props) => {
  return (
    <div id="header" style={props.styled}>
      <div id="header__email">User logged in as {props.email}</div>
      <div id="header__logout" onClick={props.logout}>
        logout
      </div>
    </div>
  );
};

export default Header;
