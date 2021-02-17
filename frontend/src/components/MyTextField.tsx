import { CSSProperties, useState } from "react";

import "./MyTextField.css";

import { IconContext } from "react-icons";

interface Props {
  type: string;
  placeholder: string;
  value?: string | number;
  onChange: (value: string) => void;
  styled?: CSSProperties;
}

const MyTextField: React.FC<Props> = (props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <IconContext.Provider value={{ className: "textField__icon" }}>
      <div className="textField" style={props.styled}>
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={onChange}
          className="textField__input"
        ></input>
        <div className="textField__sepLine" />
        {props.children}
      </div>
    </IconContext.Provider>
  );
};

export default MyTextField;
