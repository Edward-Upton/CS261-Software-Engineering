import { useEffect, useState } from "react";
import { User } from "../types";
import { IEvent, IField } from "../types";
import ReactWordcloud from "react-wordcloud";

import { IconContext } from "react-icons";
import {
  BiHappyBeaming,
  BiHappy,
  BiConfused,
  BiSad,
  BiAngry,
} from "react-icons/bi";

import "./EventHost.css";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { Icon } from "@material-ui/core";

interface FieldProps {
  field: IField;
}

interface WordMapItem {
  text: string;
  value: number;
}

const Field: React.FC<FieldProps> = (props) => {
  const [wordmapWords, setWordmapWords] = useState<WordMapItem[]>([]);

  useEffect(() => {
    if (props.field.fieldType === "text") {
      var tempArray: WordMapItem[] = [];
      props.field.data?.adjFreq?.forEach((element) => {
        tempArray.push({ text: element.word, value: element.freq });
      });
      setWordmapWords(tempArray);
    }
  }, [props.field]);

  return (
    <div className="eventHost__field">
      <div className="eventHost__field__title">{props.field.name}</div>
      <div className="eventHost__field__titleSep" />
      {props.field.fieldType === "mood" && (
        <IconContext.Provider
          value={{ className: "eventHost__field__moodSelect__emojis" }}
        >
          <div>{props.field.data?.num}</div>
        </IconContext.Provider>
      )}
      {props.field.fieldType === "text" && (
        <>
          {props.field.data?.num}
          <ReactWordcloud
            size={[300, 300]}
            words={wordmapWords}
            options={{
              rotations: 1,
              rotationAngles: [0, 0],
              fontSizes: [12, 30],
            }}
          />
          <div>
            {props.field.data?.keyPhrases?.map((item, i) => {
              return <div key={i}>{item.phrase}</div>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

interface Props {
  user: User;
  event: IEvent | null;
  closeClicked: () => void;
}

const EventHost: React.FC<Props> = (props) => {
  if (props.event) {
    return (
      <div className="eventHost">
        <div className="eventHost__header">
          <div className="eventHost__header__title">{props.event.name}</div>
          <IconContext.Provider
            value={{ className: "eventHost__header__icon" }}
          >
            <AiOutlineCloseCircle onClick={props.closeClicked} />
          </IconContext.Provider>
        </div>
        <div className="eventHost__content">
          <div>
            {props.event.feedback.map((field, i) => {
              return <Field key={i} field={field} />;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No Valid Event Data</div>;
  }
};

export default EventHost;
