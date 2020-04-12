import { IOrder } from '../interfaces/IOrder';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;
var orderSchema = new Schema({
    place_date: {
        type: String,
        required: true
      },
    course: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
      },
    user: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
      },
    paid: {
        type: Boolean,
        required: true
      },
    fee: {
        type: Number,
        required: true,
        minlength: 1
      },
    currency: {
        type: String,
        required: true,
        minlength: 1
      },
    description: {
        type: String
      },
}, { versionKey: '_version' })

orderSchema.plugin(mongooseHistory);
export default mongoose.model<IOrder & mongoose.Document>('Order', orderSchema);