import mongoose, { Schema, Document } from "mongoose";

export interface HighlightType extends Document {
  title: string;
  imageUrl: string;
  content: string;
}

const HighlightSchema: Schema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  content: { type: String, required: true },
});

const Highlight = mongoose.model<HighlightType>("Highlight", HighlightSchema);

export default Highlight;
