import { IGenericInterface } from "./IGenericInterface";

type work = {
    uploadFile:string,
    userResponses:[{UserID:string, file:string, date:number}],
    deadline:number
}
export interface ILection extends IGenericInterface {
    title: string;
    description: string;
    video: string;
    duration: number; // En segundos
    order: number; // Verificar
    course: string;
    teoricalResources:[string];
    homework:work;
    evaluations:work;
    dateAvailable:number;
    dateEnd:number;
}
