import mongoose, { Schema, Document } from "mongoose";

/** User interface. */
export interface IUser extends Document {
  email: string;
  password: string;
}

/** User schema. */
const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Export User model.
export default mongoose.model<IUser>("User", UserSchema);
