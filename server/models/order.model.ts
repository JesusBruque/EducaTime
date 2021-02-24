import { IOrder } from '../interfaces/IOrder';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;
var orderSchema = new Schema({
    date: {
        type: Number,
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
    client_secret:{
        type:String,
        required:true
    },
    payment_id:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    description: {
        type: String
      },
}, { versionKey: '_version' })

orderSchema.plugin(mongooseHistory);
export default mongoose.model<IOrder & mongoose.Document>('Order', orderSchema);
