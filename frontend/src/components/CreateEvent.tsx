interface Props {
  closeClicked: () => void;
}

const CreateEvent: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 100,
      }}
    >
      <h3>Add Event</h3>
      <h2 onClick={props.closeClicked}>Close</h2>
    </div>
  );
};

export default CreateEvent;
