import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import { IUsuario } from '../interfaces/IUsuario';
import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history'

var Schema = mongoose.Schema;
var schemaOptions = {
  toObject: {
    virtuals: true
  }
  , toJSON: {
    virtuals: true
  }
}
var usuarioSchema = new Schema({
  name: {
    type: String
  },
  apellidos: {
    type: String
  },
  titulation: String,
  password: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    select: false
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    required: true,
    unique: true,
    minlength: 3,
    trim: true
  },
  roles: [{
    type: String,
    required: true,
    enum: ['admin', 'user', 'teacher']
  }],
  salt: {
    type: Buffer,
    required: true,
    select: false
  },
  updated_for: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  cursos: [{
    idCurso: { type: Schema.Types.ObjectId, ref: 'Course' },
    completed: Boolean,
    review: {enabled: Boolean, reviewId: String},
    feeState: [{ paid: Boolean, idFee: { type: Schema.Types.ObjectId, ref: 'Course.fees' } }],
    lections: [{
      idLection: { type: Schema.Types.ObjectId, ref: 'Lection' },
      seen: Boolean,
      taskResponses: [{ origin: String, url: String }],
      evaluationResponses: [{ origin: String, url: String }]
    }]
  }],
  favoritos: [String]
}, {
  toObject: {
    virtuals: true
  }
  , toJSON: {
    virtuals: true
  }, versionKey: '_version'
});

usuarioSchema.plugin(mongooseHistory);

usuarioSchema.virtual('paymentPend').get(function () {
  let res = 0;
  for (let i = 0; i < this.cursos.length; i++) {
    const infoCurso = this.cursos[i];
    if (infoCurso.feeState && infoCurso.feeState.length > 0) {
      for (let j = 0; j < infoCurso.feeState.length; j++) {
        const fee = infoCurso.feeState[j];
        if (fee.paid === false) res++;
      }
    }
  }
  return res;
});

usuarioSchema.methods.encryptPassword = async function (password: string): Promise<{ salt: Buffer, hashedPassword: string }> {
  try {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });

    return { salt, hashedPassword };
  } catch (err) {
    throw err;
  }

};

usuarioSchema.methods.validPassword = async function (password: string): Promise<Boolean> {
  return await argon2.verify(this.password, password);
};
export default mongoose.model<IUsuario & mongoose.Document>('Usuario', usuarioSchema);
