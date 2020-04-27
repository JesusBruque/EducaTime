import { IGenericInterface } from "./IGenericInterface";
import {IReview} from "./IReview";


export interface ICourse extends IGenericInterface{
    title: string; // Nombre del curso
    thumbnail: string,
    video: string; // Chequear esto (video promo)
    duration: number; // En segundos
    description: string;
    target: string,
    goals: string; // Metas [ESTO SERÁ FORMATO HTML]
    requirements: string; // Conocimientos previos necesarios/ideales [ESTO SERÁ FORMATO HTML]
    category: [string];
    original_fee: number; // Cuota
    discount: number;
    //current_fee: number;
    last_update: number;
    tags: [string];
    score:number;
    reviews: IReview[];
    //perCent: string;
    active: boolean;
    fees:number;
    dateStartInscription:number;
    dateEndInscription:number;
    dateEndCourse: number;
    teacher:string;
}
