import { IReview } from '../interfaces/IReview';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  score: {
    type: Number,
    required: true
  },
  review: {
    type: String
  },
  user:{
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
}, { versionKey: '_version' })

reviewSchema.plugin(mongooseHistory);
export default mongoose.model<IReview & mongoose.Document>('Review', reviewSchema);