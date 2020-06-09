import { IGenericInterface } from "./IGenericInterface";
import {Model} from "mongoose";
import {ILection} from "./ILection";

type fee = {
    _id:string
    fee:number,
    date:number
}
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
    reviews: string[];
    //perCent: string;
    active: boolean;
    fees:fee[]; //Esto es un array de plazos dónde guardaremos en cada posición la cantidad correspondiente. (La suma de todos no podrá superar el precio).
    dateStartInscription:number;
    dateEndInscription:number;
    dateEndCourse: number;
    teacher:string;
    webinar:string;
    lections:string[] | ILection[];
}
