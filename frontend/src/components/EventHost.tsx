import { useEffect, useState } from "react";
import { IUser } from "../types";
import { IEvent, IField } from "../types";
import ReactWordcloud from "react-wordcloud";
import { Line } from "react-chartjs-2";
import moment, { max } from "moment";
import Select from "react-select";

import { IconContext } from "react-icons";
import {
  BiHappyBeaming,
  BiHappy,
  BiConfused,
  BiSad,
  BiAngry,
} from "react-icons/bi";

import "./EventHost.css";

import { IoArrowBackCircleOutline } from "react-icons/io5";

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

const moodDataViews = [
  { value: "average", label: "Average" },
  { value: "timeSeries", label: "Time Series" },
];

const textDataViews = [
  { value: "average", label: "Average Sentiment" },
  { value: "timeSeries", label: "Sentiment Time Series" },
  { value: "wordcloud", label: "Word Cloud" },
  { value: "keyPhrases", label: "Key Phrases" },
];

const moodAverageToIcon = [
  { mood: "Very Negative", range: [0.9, 1.8], icon: <BiAngry /> },
  { mood: "Negative", range: [1.8, 2.6], icon: <BiSad /> },
  { mood: "Neutral", range: [2.6, 3.4], icon: <BiConfused /> },
  { mood: "Positive", range: [3.4, 4.2], icon: <BiHappy /> },
  { mood: "Very Positive", range: [4.2, 5.0], icon: <BiHappyBeaming /> },
];

interface FieldProps {
  field: IField;
}
// Component that resembles each feedback field with the
// analysed data for it.
const Field: React.FC<FieldProps> = (props) => {
  // Contains words and the count for them for the wordmap.
  const [wordmapWords, setWordmapWords] = useState<WordMapItem[]>([]);
  const [viewMode, setViewMode] = useState<string | undefined>(
    props.field.fieldType === "mood" ? "average" : "wordcloud"
  );

  const [data, setData] = useState<any[]>([]);

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
    if (props.field.data?.timeSeries) {
      setData(
        props.field.data.timeSeries.map(({ date, value }) => ({
          t: moment(date).format(),
          y: value,
        }))
      );
    }
  }, [props.field]);

  if (props.field.data) {
    return (
      <div className="eventHost__field">
        {/* Field title */}
        <div className="eventHost__field__title">
          {typeToString[props.field.fieldType]}: {props.field.name}
        </div>

        <Select
          className="eventHost__field__viewModeSelect"
          options={
            props.field.fieldType === "mood" ? moodDataViews : textDataViews
          }
          defaultValue={
            props.field.fieldType === "mood"
              ? moodDataViews[0]
              : textDataViews[2]
          }
          onChange={(v) => setViewMode(v?.value)}
        />

        {/* Analysed data from participants, rendered differently depending on
      the type of field */}
        {props.field.fieldType === "mood" && (
          // Mood fields
          <div className="eventHost__field__mood">
            {viewMode === "average" && (
              <div className="eventHost__field__mood__average">
                <IconContext.Provider
                  value={{
                    className: "eventHost__field__mood__average__emoji",
                  }}
                >
                  {moodAverageToIcon.map(({ mood, range, icon }) => {
                    if (
                      props.field.data &&
                      props.field.data?.average > range[0] &&
                      props.field.data?.average <= range[1]
                    ) {
                      return (
                        <>
                          {icon}
                          <div>{mood}</div>
                        </>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                </IconContext.Provider>
              </div>
            )}
            {viewMode === "timeSeries" && (
              <div className="eventHost__field__mood__timeSeries">
                <Line
                  data={{
                    datasets: [
                      {
                        label: "Mood",
                        fill: true,
                        data: data,
                      },
                    ],
                  }}
                  height={400}
                  width={Math.min(500, (window.innerWidth - 40))}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [{ type: "time" }],
                      yAxes: [{ ticks: { beginAtZero: true } }],
                    },
                  }}
                />
              </div>
            )}
          </div>
        )}
        {props.field.fieldType === "text" && (
          // Text fields
          <div className="eventHost__field__text">
            {viewMode === "average" && (
              <div className="eventHost__field__text__average">
                <div className="eventHost__field__text__average__title">
                  Average Positive Sentiment
                </div>
                <div className="eventHost__field__text__average__value">
                  {Math.round((props.field.data.average + 1) * 50)}%
                </div>
              </div>
            )}
            {viewMode === "timeSeries" && (
              <div className="eventHost__field__text__timeSeries">
                <Line
                  data={{
                    datasets: [
                      {
                        label: "Sentiment: 1 (positive) -> -1 (negative)",
                        fill: true,
                        data: data,
                      },
                    ],
                  }}
                  height={400}
                  width={Math.min(500, (window.innerWidth - 40))}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [{ type: "time" }],
                      yAxes: [{ ticks: { beginAtZero: false } }],
                    },
                  }}
                />
              </div>
            )}
            {viewMode === "wordcloud" && (
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
            )}
            {viewMode === "keyPhrases" && (
              <div className="eventHost__field__text__keyPhrase">
                {props.field.data?.keyPhrases?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="eventHost__field__text__keyPhrase__phrase"
                    >
                      {item.phrase}
                    </div>
                  );
                })}
              </div>
            )}
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
      <div className="eventHost">
        <div className="eventHost__header">
          {/* Event name */}
          <div className="eventHost__header__title">{props.event.name}</div>

          {/* Close button */}
          <IconContext.Provider
            value={{ className: "eventHost__header__icon" }}
          >
            <IoArrowBackCircleOutline onClick={props.closeClicked} />
          </IconContext.Provider>
        </div>

        {/* Field rendering */}
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
