import mongoose, { Schema, Document, Types } from "mongoose";

export interface IField extends Types.Subdocument {
  name: string;
  description: string;
  fieldType: "mood" | "rating" | "slider" | "text";
  constraints: {
    range?: number[];
    limit?: number;
    timeSeriesStep: number;
  };
  data: {
    average?: number;
    adjFreq?: { word: string; freq: number }[];
    keyPhrases?: { phrase: string; date: Date}[];
    timeSeries?: { _id: string; value: number; date: Date }[];
    num: number; // This will store the number of data points added
  };
}

const FieldSchema: Schema = new Schema({
  name: String,
  description: String,
  fieldType: String,
  constraints: {
    range: [Number],
    limit: Number,
    timeSeriesStep: Number,
  },
  data: {
    average: Number,
    adjFreq: [{ word: String, freq: Number }],
    keyPhrases: [{ phrase: String, date: Date}],
    timeSeries: [{ value: Number, date: Date }],
    num: Number,
  },
});

export interface IEvent extends Document {
  name: string;
  eventType: string;
  start: Date;
  end: Date;
  host: Types.ObjectId;
  participants: Types.ObjectId[];
  inviteCode: string;
  feedback: Types.DocumentArray<IField>;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  eventType: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  host: { type: Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  inviteCode: { type: String, required: true },
  feedback: [FieldSchema],
});

export default mongoose.model<IEvent>("Event", EventSchema);
