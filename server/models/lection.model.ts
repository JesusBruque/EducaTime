import { ILection } from '../interfaces/ILection';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;
var lectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
  },
  videoResources: [{duration:Number,url:String}],
  teoricalResources:[{url:String}],
  taskresources:[{url:String}],
  evaluationResources:[{url:String}],
  duration: {
    type: Number,
    minlength: 1
  },
  order: {
    type: Number,
    required: true
  },
  course:{ type: Schema.Types.ObjectId, ref: 'Course' }
}, { versionKey: '_version' });

lectionSchema.plugin(mongooseHistory);
export default mongoose.model<ILection & mongoose.Document>('Lection', lectionSchema);
