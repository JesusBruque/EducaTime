import { IGenericInterface } from "./IGenericInterface";

export interface IUsuario extends IGenericInterface {
    email: string;
    username: string;
    password: string;
    rol:string;
    salt: Buffer;
    updated_for: string;
    cursos:string[];
    favoritos:string[];
    validPassword(password: string): Promise<Boolean>;
    encryptPassword(password: string): Promise<{ salt: Buffer, hashedPassword: string, err: Error }>;
}

export interface IUsuarioDTO {
    _id: string;
    email: string;
    username:string;
    rol:string;
    cursos:string[];
    favoritos:string[];
}
