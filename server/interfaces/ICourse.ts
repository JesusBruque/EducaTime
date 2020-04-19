import { IGenericInterface } from "./IGenericInterface";

export interface ICourse extends IGenericInterface{
    title: string; // Nombre del curso
    description: string;
    thumbnail: string,
    video: string; // Chequear esto (video promo)
    duration: number; // En segundos
    requirements: [string]; // Conocimientos previos necesarios/ideales
    category: [string];
    fee: number; // Cuota
    discount: number;
    last_update: string;
    goals: [string]; // Metas
    tags: [string];
    score:number;
    reviews: [string];
    perCent: string;
    active: boolean;
}