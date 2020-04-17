import { IGenericInterface } from "./IGenericInterface";

export interface IUsuario extends IGenericInterface {
    order: string;
    email: string;
    username: string;
    password: string;
    salt: Buffer;
    updated_for: string;
    validPassword(password: string): Promise<Boolean>;
    encryptPassword(password: string): Promise<{ salt: Buffer, hashedPassword: string, err: Error }>;
}

export interface IUsuarioDTO {
    _id: string;
    email: string;
}
