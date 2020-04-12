import { IAdmin } from '../interfaces/IAdmin';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;
var adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  }
}, { versionKey: '_version' })

adminSchema.plugin(mongooseHistory);
export default mongoose.model<IAdmin & mongoose.Document>('Admin', adminSchema);