import mongoose, { Schema, Document, Types } from "mongoose";

/** Event feedback field interface. */
export interface IField extends Types.Subdocument {
  /** Name of field. */
  name: string;
  /** Description of field. */
  description: string;
  /** Type of feedback field. */
  fieldType: "mood" | "rating" | "slider" | "text";
  /** Feedback field data constraints. */
  constraints: {
    range?: number[];
    limit?: number;
    timeSeriesStep: number;
  };
  /** Data received for the feedback field. */
  data: {
    /** Average data value */
    average?: number;
    /** Frequency of adjectives of a text feedback field. */
    adjFreq?: { word: string; freq: number }[];
    /** Key phrases from a text feedback field. */
    keyPhrases?: { phrase: string; date: Date }[];
    /** Plottable time series of the data. */
    timeSeries?: { _id: string; value?: number; date: Date; num: number }[];
    /** Total number of feedback received. */
    num: number;
  };
}

/** Event interface. */
export interface IEvent extends Document {
  /** Name of event. */
  name: string;
  /** Type of event. */
  eventType: string;
  /** Starting time and date of event. */
  start: Date;
  /** Ending time and date of event. */
  end: Date;
  /** Host user of the event */
  host: Types.ObjectId;
  /** Array of the registered participant users of the event. */
  participants: Types.ObjectId[];
  /** Invite code of the event. */
  inviteCode: string;
  /** Feedback fields of the event. */
  feedback: Types.DocumentArray<IField>;
}

/** Feedback Field Schema for feedback subdocuments. */
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
    keyPhrases: [{ phrase: String, date: Date }],
    timeSeries: [{ value: Number, date: Date, num: Number }],
    num: Number,
  },
});

/** Event schema. */
const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  eventType: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  // Reference to user model.
  host: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // Reference to user model.
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  inviteCode: { type: String, required: true },
  feedback: [FieldSchema],
});

// Export Event model.
export default mongoose.model<IEvent>("Event", EventSchema);
