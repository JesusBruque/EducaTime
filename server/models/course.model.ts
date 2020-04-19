import { ICourse } from '../interfaces/ICourse';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;
var courseSchema = new Schema({ 
  title: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  },
  thumbnail:{
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  requirements: {
    type: [String],
    required: true,
    trim: true
  },
  category: {
    type: [String],
    required: true,
    trim: true
  },
  fee: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number
  },
  last_update: {
    type: String,
    trim: true
  },
  goals: {
    type: [String],
    required: true,
    minlength: 5,
    trim: true
  },
  tags: {
    type: [String],
    trim: true
  },
  score: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [String]
  },
  perCent: {
    type: String,
    required: true,
  },
  active:{
    type: Boolean,
    required: true
  }
}, { versionKey: '_version' })

courseSchema.plugin(mongooseHistory);
export default mongoose.model<ICourse & mongoose.Document>('Course', courseSchema);