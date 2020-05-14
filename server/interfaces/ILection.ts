import { IGenericInterface } from "./IGenericInterface";

type work = {
    _id:string;
    name:string;
    uploadFile:string,
    userResponses:[{UserID:string, file:string, date:number, status: string, mark: number}],
    deadline:number
}
export interface ILection extends IGenericInterface {
    title: string;
    description: string;
    video: [{name:string,url:string}];
    duration: number; // En segundos
    order: number;
    course: string;
    teoricalResources:[{name:string,url:string}];
    homework:[work];
    evaluations:[work];
    dateAvailable:number;
    dateEnd:number;
}
