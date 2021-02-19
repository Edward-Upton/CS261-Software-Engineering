import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IEvent extends Document {
  name: string;
  eventType?: string;
  start: Date;
  end: Date;
  host: ObjectId;
  participants: ObjectId[];
  inviteCode: string;
  feedback: IField[];
}

export interface IField {
  _id: string;
  name: string;
  description: string;
  fieldType: "mood" | "rating" | "slider" | "text";
  // This will contain specific constraints for the type of field
  constraints: {
    range?: number[];
    limit?: number;
  };
  // This will contain the feedback data for this type of field
  data: {
    average?: number;
    wordFreq?: { word: string; freq: number };
    timeSeries?: { value: number; date: Date };
    num: number; // This will store the number of data points added
  };
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  eventType: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  host: { type: Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  inviteCode: { type: String, required: true },
  feedback: [
    {
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
        wordFreq: [{ word: String, freq: Number }],
        timeSeries: [{ value: Number, date: Date }],
        num: Number,
      },
    },
  ],
});

export default mongoose.model<IEvent>("Event", EventSchema);
