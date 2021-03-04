import { IconContext } from "react-icons";
import { AiOutlineDelete } from "react-icons/ai";
import { FieldTypes, INewField } from "../types";
import Select from "react-select";

import "./NewField.css";

import MyTextField from "./MyTextField";

const fieldTypes = [
  { value: "mood", label: "Mood Select" },
  { value: "text", label: "Text" },
];

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
  const onLimitChange = (v: number) => {
    props.updateField(props.index, {
      ...props.field,
      constraints: { ...props.field.constraints, limit: v },
    });
  };
  return (
    <div className="createFields__field">
      <div className="createFields__field__title">
        {/* Feedback type */}
        <div className="createFields__field__type">
          <div>Input Type:</div>
          <Select
            className="createFields__field__type__select"
            options={fieldTypes}
            defaultValue={fieldTypes[0]}
            onChange={(v: any) => onTypeChange(v?.value)}
          />
        </div>

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
        placeholder="..."
        label="Title:"
        onChange={(v) => onNameChange(v)}
        value={props.field.name}
        styled={{ height: "2rem", marginBottom: "0.2rem" }}
      ></MyTextField>

      {/* Field description */}
      <MyTextField
        type="text"
        placeholder="..."
        label="Description:"
        onChange={(v) => onDescChange(v)}
        value={props.field.description}
        styled={{ height: "2rem", marginBottom: "0.2rem" }}
      ></MyTextField>
      <MyTextField
        type="number"
        placeholder="..."
        label="Allow Submit Every (seconds):"
        onChange={(v) => onLimitChange(parseInt(v))}
        value={props.field.constraints.limit}
        styled={{ height: "2rem" }}
      ></MyTextField>
    </div>
  );
};

export default NewFIeld;
