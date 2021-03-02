import { IconContext } from "react-icons";
import { AiOutlineDelete } from "react-icons/ai";
import { FieldTypes, INewField } from "../types";
import "./NewField.css";

import MyTextField from "./MyTextField";

interface FieldProps {
  field: INewField;
  index: number;
  updateField: (index: number, newField: INewField) => void;
  deleteField: (index: number) => void;
}

// Component for creating a new field and setting the deatils up
// for this field. Allows setting the type, name and description
// of the field.
const NewFIeld: React.FC<FieldProps> = (props) => {
  // These functions handle different detail changes and pass it to
  // the parent who will update the actual feedback field object.
  const onTypeChange = (v: FieldTypes) => {
    props.updateField(props.index, { ...props.field, fieldType: v });
  };
  const onNameChange = (v: string) => {
    props.updateField(props.index, { ...props.field, name: v });
  };
  const onDescChange = (v: string) => {
    props.updateField(props.index, { ...props.field, description: v });
  };
  return (
    <div className="createFields__field">
      <div className="createFields__field__title">
        {/* Feedback type */}
        <select
          className="createFields__field__type"
          onChange={(v) => onTypeChange(v.target.value as FieldTypes)}
          value={props.field.fieldType}
        >
          <option className="createFields__field__type__option" value="mood">
            Emoji Mood Select
          </option>
          <option className="createFields__field__type__option" value="rating">
            Rating
          </option>
          <option className="createFields__field__type__option" value="slider">
            Variable Slider
          </option>
          <option className="createFields__field__type__option" value="text">
            Custom Text
          </option>
        </select>

        {/* Delete button */}
        <IconContext.Provider
          value={{ className: "createFields__field__delete" }}
        >
          <AiOutlineDelete onClick={() => props.deleteField(props.index)} />
        </IconContext.Provider>
      </div>

      <div className="createFields__field__titleSep" />

      {/* Field name */}
      <MyTextField
        type="text"
        placeholder="Name..."
        onChange={(v) => onNameChange(v)}
        value={props.field.name}
        styled={{ height: "2rem", minHeight: "2rem", marginBottom: "0.2rem" }}
      ></MyTextField>

      {/* Field description */}
      <MyTextField
        type="text"
        placeholder="Description..."
        onChange={(v) => onDescChange(v)}
        value={props.field.description}
        styled={{ height: "2rem", minHeight: "2rem" }}
      ></MyTextField>
    </div>
  );
};

export default NewFIeld;
