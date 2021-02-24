import { IBookmark } from '../interfaces/IBookmark';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;
var bookmarkSchema = new Schema({
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

bookmarkSchema.plugin(mongooseHistory);
export default mongoose.model<IBookmark & mongoose.Document>('Bookmark', bookmarkSchema);
