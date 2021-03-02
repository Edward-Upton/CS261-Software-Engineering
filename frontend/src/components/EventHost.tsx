import { useEffect, useState } from "react";
import { IUser } from "../types";
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

const typeToString = {
  mood: "Mood",
  rating: "Rating",
  slider: "Slider",
  text: "Text",
};

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

  if (props.field.data) {
    return (
      <div className="eventHost__field">
        {/* Field title */}
        <div className="eventHost__field__title">
          {typeToString[props.field.fieldType]}: {props.field.name}
        </div>

        <div className="eventHost__field__titleSep" />

        {/* Analysed data from participants, rendered differently depending on
      the type of field */}
        {props.field.fieldType === "mood" && (
          // Mood fields
          <div className="eventHost__field__mood">
            <div className="eventHost__field__mood__average">
              <div className="eventHost__field__mood__average__title">
                Average Response
              </div>
              <IconContext.Provider
                value={{ className: "eventHost__field__mood__average__emoji" }}
              >
                {props.field.data.average <= 1 && (
                  <>
                    <BiAngry />
                    <div>Very Negative</div>
                  </>
                )}
                {props.field.data.average <= 2 && props.field.data.average > 1 && (
                  <>
                    <BiSad />
                    <div>Negative</div>
                  </>
                )}
                {props.field.data.average <= 3 && props.field.data.average > 2 && (
                  <>
                    <BiConfused />
                    <div>Neutral</div>
                  </>
                )}
                {props.field.data.average <= 4 && props.field.data.average > 3 && (
                  <>
                    <BiHappy />
                    <div>Positive</div>
                  </>
                )}
                {props.field.data.average <= 5 && props.field.data.average > 4 && (
                  <>
                    <BiHappyBeaming />
                    <div>Very Positive</div>
                  </>
                )}
              </IconContext.Provider>
            </div>
          </div>
        )}
        {props.field.fieldType === "text" && (
          // Text fields
          <div className="eventHost__field__text">
            <div className="eventHost__field__text__wordcloud">
              <ReactWordcloud
                words={wordmapWords}
                options={{
                  rotations: 1,
                  fontFamily: "Roboto",
                  rotationAngles: [0, 0],
                  fontSizes: [20, 40],
                }}
              />
            </div>
            <div>
              {/* {props.field.data?.keyPhrases?.map((item, i) => {
                return <div key={i}>{item.phrase}</div>;
              })} */}
            </div>
          </div>
        )}

        <div>Responses: {props.field.data.num}</div>
      </div>
    );
  } else {
    return <div>No Data for this Field</div>;
  }
};

interface Props {
  user: IUser;
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
