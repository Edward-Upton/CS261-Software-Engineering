import { CSSProperties, useState } from "react";

import "./MyButton.css";

interface Props {
  styled?: CSSProperties;
  text?: string;
  fontSize?: string;
  disabled?: boolean;
  onClick: () => void;
}

const MyButton: React.FC<Props> = (props) => {
  const buttonClicked = () => {
    if (props.disabled !== undefined) {
      if (!props.disabled) {
        props.onClick();
      }
    } else {
      props.onClick();
    }
  };
  return (
    <div className="button" onClick={buttonClicked} style={props.styled}>
      <div className="button__text" style={{ fontSize: props.fontSize }}>
        {props.text}
      </div>
    </div>
  );
};

export default MyButton;
