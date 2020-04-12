import { ICourse } from "./ICourse";

export interface ILection {
    _id: string;
    title: string;
    description: string;
    video: string;
    duration: Number; // En segundos
    order: Number; // Verificar
    course: string
}