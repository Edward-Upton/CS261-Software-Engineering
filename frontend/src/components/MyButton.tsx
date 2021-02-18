import { CSSProperties, useState } from "react";

import "./MyButton.css";

interface Props {
  styled?: CSSProperties;
  text?: string;
  onClick: () => void;
}

const MyButton: React.FC<Props> = (props) => {
  return (
    <div
      className="registerButton"
      onClick={props.onClick}
      style={props.styled}
    >
      <div className="registerButton__text">{props.text}</div>
    </div>
  );
};

export default MyButton;
