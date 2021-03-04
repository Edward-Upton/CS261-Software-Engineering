import "./ModeButton.css";

interface Props {
  tab: boolean;
  setTab: React.Dispatch<React.SetStateAction<boolean>>;
}

/* 
    Sliding button used specifically to allow switching between participating mode
    and hosting mode. The value is controlled by the parent via props.
*/
const ModeButton: React.FC<Props> = ({ tab, setTab }) => {
  return (
    <div className="modeBtn__wrapper">
      <div
        className={`modeBtn__highlighter ${
          tab ? "modeBtn__highlighter__right" : "modeBtn__highlighter__left"
        }`}
      />
      <div
        className={`modeBtn__option ${
          !tab ? "modeBtn__option__sel" : "modeBtn__option__notSel"
        }`}
        onClick={() => setTab(false)}
      >
        Participate
      </div>
      <div
        className={`modeBtn__option ${
          tab ? "modeBtn__option__sel" : "modeBtn__option__notSel"
        }`}
        onClick={() => setTab(true)}
      >
        Host
      </div>
    </div>
  );
};

export default ModeButton;
