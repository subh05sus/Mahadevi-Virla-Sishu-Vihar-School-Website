import mongoose, { Schema, Document } from 'mongoose';

export interface CarouselImageType extends Document {
  imageUrl: string;
  featuredText:string;
  ButtonLink:string;
}

const CarouselImageSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
  featuredText: { type: String, required: false },
  ButtonLink: { type: String, required: false },
});

const CarouselImage = mongoose.model<CarouselImageType>('CarouselImage', CarouselImageSchema);

export default CarouselImage;
