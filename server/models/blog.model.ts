import { IBlog } from '../interfaces/IBlog';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  },
  subtitle:String,
  description: {
    type: String,
    required:true
  },
  thumbnail:{
    type:String,
    required:true
  },
  video:String,
  creation_date: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  active: {
    type: Boolean,
    required: true,
  },
  tags: {
    type: [String],
    trim: true
  },
}, { versionKey: '_version' })

blogSchema.plugin(mongooseHistory);
export default mongoose.model<IBlog & mongoose.Document>('Blog', blogSchema);
