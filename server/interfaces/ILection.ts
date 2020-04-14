import { IGenericInterface } from "./IGenericInterface";

export interface ILection extends IGenericInterface {
    title: string;
    description: string;
    video: string;
    duration: Number; // En segundos
    order: Number; // Verificar
    course: string
}