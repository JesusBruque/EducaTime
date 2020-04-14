import { IGenericInterface } from "./IGenericInterface";

export interface IBookmark extends IGenericInterface{
    bookmark: Number; // En segundos, tiempo actual de progreso del video
    finished: boolean;
    lection: String;
    user: string
}