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
  video: {
    type: [{nombre:String,url:String}]
  },
  duration: {
    type: Number,
    minlength: 1
  },
  order: {
    type: Number,
    required: true
  },
  course:{ type: Schema.Types.ObjectId, ref: 'Course' },
  teoricalResources: {
    type: [{name:String,url:String}]
  },
  homework: {
    type:[{
            name:String,
            uploadFile: String, 
            userResponses:[{
                  UserID: String, 
                  file: String, 
                  date: Number,
                  status: {
                    type: String,
                    enum:['Entregado','En revisión','Calificado']
                  },
                  mark: {
                    type: Number,
                    max: 10,
                    min: 0
                  }
                }],
            deadline: Number}]
  },
  evaluations: {
    type:[{
        name:String,
        uploadFile: String, 
        userResponses:[{
                UserID: String, 
                file: String, 
                date: Number}],
        deadline: Number
    }]
  },
  dateAvailable:{
    type: Number
  },
  dateEnd:{
    type: Number
  }
}, { versionKey: '_version' });

lectionSchema.plugin(mongooseHistory);
export default mongoose.model<ILection & mongoose.Document>('Lection', lectionSchema);
