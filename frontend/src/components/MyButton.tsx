import { CSSProperties } from "react";

import "./MyButton.css";

interface Props {
  children?: React.ReactNode;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  styled?: CSSProperties;
  fontSize?: string;
  textColour?: string;
  disabled?: boolean;
}

// Custom button component that is consistent with the
// design style. Features a rectangle with slightly
// rounder corners. The colour and text can be changed.
const MyButton: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`button ${props.disabled && "disabled"}`}
      style={{
        ...props.styled,
        fontSize: props.fontSize,
        color: props.textColour,
      }}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default MyButton;
