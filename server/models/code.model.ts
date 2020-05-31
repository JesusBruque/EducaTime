import {ICode} from '../interfaces/ICode';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history';

var Schema = mongoose.Schema;
var codeSchema = new Schema({
    code:{
        type:String,
        required:true
    },
    course:{ type: Schema.Types.ObjectId, ref: 'Course' },
    value:{type:Number, required:true},
    used:{type:Boolean,required:true}
},{ versionKey: '_version' });


codeSchema.plugin(mongooseHistory);

export default mongoose.model<ICode & mongoose.Document>('Code',codeSchema);
