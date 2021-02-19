import { CSSProperties, useState } from "react";

import "./MyButton.css";

interface Props {
  styled?: CSSProperties;
  text?: string;
  disabled?: boolean;
  onClick: () => void;
}

const MyButton: React.FC<Props> = (props) => {
  const buttonClicked = () => {
    if (props.disabled !== undefined) {
      if (!props.disabled) {
        props.onClick();
      }
    }
  };
  return (
    <div
      className="registerButton"
      onClick={buttonClicked}
      style={props.styled}
    >
      <div className="registerButton__text">{props.text}</div>
    </div>
  );
};

export default MyButton;
