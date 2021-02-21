import { CSSProperties } from "react";

import "./Header.css";

interface Props {
  styled?: CSSProperties;
  email?: string;
  logout: () => void;
}

const Header: React.FC<Props> = (props) => {
  return (
    <div className="header" style={props.styled}>
      <div className="header__email">User logged in as {props.email}</div>
      <div className="header__logout" onClick={props.logout}>
        logout
      </div>
    </div>
  );
};

export default Header;
