import "./FieldList.css";

interface Props {
  title: string;
}

// This is used to render a list of fields, either for event 
// creation, viewing feedback or for submitting feedback.
const FieldList: React.FC<Props> = (props) => {
  return (
    <div className="fieldList">
      <div className="fieldList__title">Add Feedback Fields</div>
      {props.children}
    </div>
  );
};

export default FieldList;
