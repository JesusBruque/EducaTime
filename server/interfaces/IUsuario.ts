import { IGenericInterface } from "./IGenericInterface";
import mongoose from "mongoose";

type userCourse = {
    idCurso: string,
    feeState:{paid:Boolean,idFee:string}[],
    lections:{
      idLection:string,
      taskResponses:{origin:String,url:String}[],
      evaluationResponses:{origin:String,url:String}[]
}[]
}
export interface IUsuario extends IGenericInterface {
    name:string;
    apellidos:string;
    email: string;
    username: string;
    password: string;
    roles:string[];
    salt: Buffer;
    updated_for: string;
    cursos:userCourse[];
    favoritos:string[];
    validPassword(password: string): Promise<Boolean>;
    encryptPassword(password: string): Promise<{ salt: Buffer, hashedPassword: string, err: Error }>;
}

export interface IUsuarioDTO {
    _id: string;
    email: string;
    username:string;
    roles:string[];
    //cursos:string[];
    //favoritos:string[];
}
