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

// Component that resembles each feedback field with the
// analysed data for it.
const Field: React.FC<FieldProps> = (props) => {
  // Contains words and the count for them for the wordmap.
  const [wordmapWords, setWordmapWords] = useState<WordMapItem[]>([]);

  // On field change, if the field is of type text convert the adjective
  // frequency type to one that the Wordcloud can use.
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
      {/* Field title */}
      <div className="eventHost__field__title">{props.field.name}</div>

      <div className="eventHost__field__titleSep" />

      {/* Analysed data from participants, rendered differently depending on
      the type of field */}
      {props.field.fieldType === "mood" && (
        // Mood fields
        <IconContext.Provider
          value={{ className: "eventHost__field__moodSelect__emojis" }}
        >
          <div>{props.field.data?.num}</div>
        </IconContext.Provider>
      )}
      {props.field.fieldType === "text" && (
        // Text fields
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

// Panel for viewing feedback for the user's event they 
// are hosting. This renders all the feedback field with
// the feedback results after analysis.
const EventHost: React.FC<Props> = (props) => {
  if (props.event) {
    return (
      <div id="eventHost">
        <div id="eventHost__header">
          {/* Event name */}
          <div id="eventHost__header__title">{props.event.name}</div>

          {/* Close button */}
          <IconContext.Provider
            value={{ className: "eventHost__header__icon" }}
          >
            <AiOutlineCloseCircle onClick={props.closeClicked} />
          </IconContext.Provider>
        </div>

        {/* Field rendering */}
        <div id="eventHost__content">
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
