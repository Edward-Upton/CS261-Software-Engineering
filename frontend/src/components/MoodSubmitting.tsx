import { IconContext } from "react-icons";
import {
  BiHappyBeaming,
  BiHappy,
  BiConfused,
  BiSad,
  BiAngry,
} from "react-icons/bi";

import "./MoodSubmitting.css";

interface Props {
  num: number | null;
  setNum: (v: number | null) => void;
}

const MoodSubmitting: React.FC<Props> = ({ num, setNum }) => {
  console.log(num);
  return (
    <div className="moodSubmitting__wrapper">
      <IconContext.Provider
        value={{
          className: `moodSubmitting__emojis ${
            num === 1 ? "moodSubmitting__selected" : ""
          }`,
        }}
      >
        <BiAngry onClick={() => (num !== 1 ? setNum(1) : setNum(null))} />
      </IconContext.Provider>
      <IconContext.Provider
        value={{
          className: `moodSubmitting__emojis ${
            num === 2 ? "moodSubmitting__emojis__selected" : ""
          }`,
        }}
      >
        <BiSad onClick={() => (num !== 2 ? setNum(2) : setNum(null))} />
      </IconContext.Provider>
      <IconContext.Provider
        value={{
          className: `moodSubmitting__emojis ${
            num === 3 ? "moodSubmitting__emojis__selected" : ""
          }`,
        }}
      >
        <BiConfused onClick={() => (num !== 3 ? setNum(3) : setNum(null))} />
      </IconContext.Provider>
      <IconContext.Provider
        value={{
          className: `moodSubmitting__emojis ${
            num === 4 ? "moodSubmitting__emojis__selected" : ""
          }`,
        }}
      >
        <BiHappy onClick={() => (num !== 4 ? setNum(4) : setNum(null))} />
      </IconContext.Provider>
      <IconContext.Provider
        value={{
          className: `moodSubmitting__emojis ${
            num === 5 ? "moodSubmitting__emojis__selected" : ""
          }`,
        }}
      >
        <BiHappyBeaming
          onClick={() => (num !== 5 ? setNum(5) : setNum(null))}
        />
      </IconContext.Provider>
    </div>
  );
};

export default MoodSubmitting;
