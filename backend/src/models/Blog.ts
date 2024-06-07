import mongoose, { Schema, Document } from "mongoose";

export interface BlogType extends Document {
  title: string;
  thumbnailImageUrl: string;
  content: string;
  author: string;
  publishDate: string;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  thumbnailImageUrl: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishDate: { type: String, required: true },
});

const Destination = mongoose.model<BlogType>(
  "Blog",
  BlogSchema
);

export default Destination;
