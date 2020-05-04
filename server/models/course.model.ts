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
    trim: true
  },
  thumbnail:{
    type: String
  },
  video: {
    type: String
  },
  duration: {
    type: Number
  },
  target: {
    type: String,
    trim: true,
    required:true
  },
  requirements: {
    type: String,
    trim: true,
    required:true
  },
  fees : {
    type: [{fee:Number,dateExpires:Number}],
    required: true
  },
  category: {
    type: [String],
    trim: true
  },
  original_fee: {
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
    type: String,
    trim: true,
    required:true
  },
  tags: {
    type: [String],
    trim: true
  },
  score: {
    type: Number
  },
  reviews: {
    type: [String]
  },
  teacher:{
    type: String
  },
  active:{
    type: Boolean,
    required: true
  },
  webinar:String
}, { versionKey: '_version' });

courseSchema.plugin(mongooseHistory);
export default mongoose.model<ICourse & mongoose.Document>('Course', courseSchema);
