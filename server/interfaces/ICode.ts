import {IGenericInterface} from "./IGenericInterface";

export interface ICode extends IGenericInterface{
    code:string;
    course:string;
    value:number;
    used:boolean;
}
