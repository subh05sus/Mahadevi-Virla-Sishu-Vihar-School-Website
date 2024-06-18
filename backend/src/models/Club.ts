import mongoose, { Schema, Document } from "mongoose";

interface Event {
  _id: mongoose.Types.ObjectId;
  date: Date;
  heading: string;
  content: string;
  time: string;
  place: string;
  topics: string[];
  registrations: { studentName: string; phone: String; email: string }[];
}

interface ClubDocument extends Document {
  name: string;
  description: string;
  assignedTeacher: string;
  imageUrl: string;
  events: Event[];
}

const eventSchema = new Schema<Event>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  date: { type: Date, required: true },
  heading: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true },
  topics: [{ type: String }],
  registrations: [{ studentName: String, phone: String, email: String }],
});

const clubSchema = new Schema<ClubDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  assignedTeacher: { type: String, required: true },
  imageUrl: { type: String, required: true },
  events: [eventSchema],
});

const Club = mongoose.model<ClubDocument>("Club", clubSchema);

export default Club;
