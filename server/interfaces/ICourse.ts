import { IGenericInterface } from "./IGenericInterface";

export interface ICourse extends IGenericInterface{
    title: string; // Nombre del curso
    description: string;
    video: string; // Chequear esto (video promo)
    duration: Number; // En segundos
    requirements: [string]; // Conocimientos previos necesarios/ideales
    category: [string];
    fee: Number; // Cuota
    last_update: string;
    goals: [string]; // Metas
    tags: [string]
}