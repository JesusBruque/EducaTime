import { IGenericInterface } from "./IGenericInterface";
import mongoose from "mongoose";

type userCourse = {
    idCurso: string,
    completed: boolean,
    review: {enabled: boolean, reviewId: string},
    feeState: { paid: Boolean, idFee: string }[],
    lections: {
        idLection: string,
        seen: boolean,
        taskResponses: { origin: String, url: String }[],
        evaluationResponses: { origin: String, url: String }[]
    }[]
}
export interface IUsuario extends IGenericInterface {
    name: string;
    apellidos: string;
    email: string;
    username: string;
    password: string;
    roles: string[];
    salt: Buffer;
    updated_for: string;
    cursos: userCourse[];
    favoritos: string[];
    paymentPend?: number;
    validPassword(password: string): Promise<Boolean>;
    encryptPassword(password: string): Promise<{ salt: Buffer, hashedPassword: string, err: Error }>;
}

export interface IUsuarioDTO {
    _id: string;
    email: string;
    username: string;
    roles: string[];
    cursos: userCourse[];
    favoritos: string[];
}
