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
    <div className="header" style={props.styled}>
      <div className="header__email">
        Hello {props.email?.split("@")[0]}
      </div>
      <div className="header__logout" onClick={props.logout}>
        logout
      </div>
    </div>
  );
};

export default Header;
