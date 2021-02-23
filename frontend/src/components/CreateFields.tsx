import { useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineDelete } from "react-icons/ai";
import { FieldTypes, INewField } from "../types";
import "./CreateFields.css";
import MyButton from "./MyButton";
import MyTextField from "./MyTextField";

interface FieldProps {
  field: INewField;
  index: number;
  updateField: (index: number, newField: INewField) => void;
  deleteField: (index: number) => void;
}

const Field: React.FC<FieldProps> = (props) => {
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
        <IconContext.Provider
          value={{ className: "createFields__field__delete" }}
        >
          <AiOutlineDelete onClick={() => props.deleteField(props.index)} />
        </IconContext.Provider>
      </div>
      <div className="createFields__field__titleSep" />
      <MyTextField
        type="text"
        placeholder="Name..."
        onChange={(v) => onNameChange(v)}
        value={props.field.name}
        styled={{ height: "2rem", minHeight: "2rem", marginBottom: "0.2rem" }}
      ></MyTextField>
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

interface Props {
  fields: INewField[];
  updateField: (index: number, newField: INewField) => void;
  addField: (fieldType: FieldTypes) => void;
  deleteField: (index: number) => void;
}
const CreateFields: React.FC<Props> = (props) => {
  return (
    <div className="createFields">
      <div className="createFields__title">Add Feedback Fields</div>
      {props.fields.map((field, i) => {
        return (
          <Field
            key={i}
            index={i}
            field={field}
            updateField={props.updateField}
            deleteField={props.deleteField}
          />
        );
      })}
      <MyButton
        text="Add Field"
        onClick={() => props.addField("mood")}
        styled={{ height: "1.5rem" }}
      />
    </div>
  );
};

export default CreateFields;
