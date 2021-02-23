import ReactDOMServer from "react-dom/server";
import { CSSProperties } from "react";

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
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    props.onChange(e.target.value);
  };

  const noIcon = !props.children;

  return (
    <IconContext.Provider value={{ className: "textField__icon" }}>
      <div className="textField" style={props.styled}>
        {!noIcon && (
          <>
            {props.children}
            <div className="textField__sepLine" />
            {props.type !== "area" && (
              <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
                className="textField__input"
              ></input>
            )}
            {props.type === "area" && (
              <textarea
                // type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
                className="textField__textarea"
              ></textarea>
            )}
          </>
        )}
        {noIcon && (
          <>
            {props.type !== "area" && (
              <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
                className="textField__input textField__inputNoIcon"
              ></input>
            )}
            {props.type === "area" && (
              <textarea
                // type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
                className="textField__textarea"
              ></textarea>
            )}
          </>
        )}
      </div>
    </IconContext.Provider>
  );
};

export default MyTextField;
