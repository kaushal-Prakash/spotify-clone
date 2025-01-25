import mongoose, { Schema } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin";
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

export default mongoose.model<IAdmin>("Admin", AdminSchema);
