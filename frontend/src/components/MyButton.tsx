import { CSSProperties } from "react";

import "./MyButton.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  styled?: CSSProperties;
  fontSize?: string;
  textColour?: string;
  disabled?: boolean;
}

// Custom button component that is consisent with the
// design style. Features a rectangle with slightly
// rounder corners. The colour and text can be changed.
const MyButton: React.FC<Props> = (props) => {
  return (
    <div
      className="button"
      onClick={props.disabled ? undefined : props.onClick}
      style={props.styled}
    >
      <div className="button__text" style={{ fontSize: props.fontSize }}>
        {props.children}
      </div>
    </div>
  );
};

export default MyButton;
