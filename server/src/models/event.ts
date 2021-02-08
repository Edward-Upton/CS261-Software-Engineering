import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  eventType?: string;
  start: Date;
  end: Date;
  host: string;
  participants: string[];
  inviteCode: string;
  feedback: IField[];
}

export interface IField {
  // Will have an array of fields
  _id: string,
  name: string;
  description: string;
  fieldType: "mood" | "rating" | "slider" | "text";
  constraints: {
    range?: number[];
    limit?: number;
  }; // This will contain specific constraints for the type of field
  data: {
    average?: number;
    wordFreq?: { word: string; freq: number };
    timeSeries?: { value: number; date: Date };
  }; // This will contain the feedback data for this type of field
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  eventType: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  host: { type: String, required: true }, // This will be the ID
  participants: { type: [String], required: true }, // This will be a list of IDs
  inviteCode: { type: String, required: true },
  feedback: {
    type: [
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
        },
      },
    ],
  },
});

export default mongoose.model<IEvent>("Event", EventSchema);
