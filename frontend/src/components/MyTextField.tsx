import { CSSProperties } from "react";

import "./MyTextField.css";

import { IconContext } from "react-icons";

interface Props {
  type: string;
  placeholder: string;
  label?: string;
  value?: string | number;
  onChange: (value: string) => void;
  styled?: CSSProperties;
}

// Custom text field component that is consisent with the
// design style. Features a rounded corner border and allow
// the addition of icons at the beggining of the box. Also
// allows rendering a text area instead of a 1 line box.
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
          // Render text field with icon and seperation line
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
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
                className="textField__textarea"
              ></textarea>
            )}
          </>
        )}
        {noIcon && (
          // Render text field without icon and without seperation line
          <>
            {props.type !== "area" && (
              <>
                {props.label && (
                  <div style={{ whiteSpace: "nowrap" }}>{props.label}</div>
                )}
                <input
                  type={props.type}
                  placeholder={props.placeholder}
                  value={props.value}
                  onChange={onChange}
                  className="textField__input textField__inputNoIcon"
                ></input>
              </>
            )}
            {props.type === "area" && (
              <textarea
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
