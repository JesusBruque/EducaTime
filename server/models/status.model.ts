import { IStatus } from '../interfaces/IStatus';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;
var statusSchema = new Schema({
    bookmark: {
      type: Number
    },
    finished: {
      type: Boolean,
      required: true
    },
    lection: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: String,
      required: true,
      minlength: 2,
      trim: true
    },
}, { versionKey: '_version' })

statusSchema.plugin(mongooseHistory);
export default mongoose.model<IStatus & mongoose.Document>('Status', statusSchema);
