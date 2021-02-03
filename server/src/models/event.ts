import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  email: string;
  password: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String },
  start: {type: Date},
  end: {type: Date},
  host: {type: String, required: true}, // This will be the ID
  participants: {type: [String]}, // This will be a list of IDs
  inviteCode: {type: String},
});

export default mongoose.model<IEvent>("Event", EventSchema);
