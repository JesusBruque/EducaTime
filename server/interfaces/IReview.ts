import { IGenericInterface } from "./IGenericInterface";

export interface IReview extends IGenericInterface{
    score: number,
    review: string,
    user: string,
    course: string,
    date:number
}