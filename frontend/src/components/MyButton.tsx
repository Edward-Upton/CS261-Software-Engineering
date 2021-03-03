import { CSSProperties } from "react";

import "./MyButton.css";

interface Props {
  styled?: CSSProperties;
  text?: string;
  fontSize?: string;
  textColour?: string;
  disabled?: boolean;
  onClick: () => void;
}

// Custom button component that is consisent with the
// design style. Features a rectangle with slightly
// rounder corners. The colour and text can be changed.
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
      <div className="button__text" style={{ fontSize: props.fontSize, color: props.textColour }}>
        {props.text}
      </div>
    </div>
  );
};

export default MyButton;
