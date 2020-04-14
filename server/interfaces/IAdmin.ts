import { IGenericInterface } from "./IGenericInterface";

export interface IAdmin extends IGenericInterface{
    email: string;
    password: string // Verificar validacion de contraseña
} 