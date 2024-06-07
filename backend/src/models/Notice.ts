import mongoose, { Schema, Document } from "mongoose";

export interface NoticeType extends Document {
  title: string;
  date: string;
  content: string;
}

const NoticeSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
});

const Notice = mongoose.model<NoticeType>("Notice", NoticeSchema);

export default Notice;
