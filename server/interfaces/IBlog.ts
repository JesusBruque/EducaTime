import { IGenericInterface } from "./IGenericInterface";

export interface IBlog extends IGenericInterface {
    title: string;
    description: string;
    thumbnail: string;
    video: string;
    creation_date: string;
    author: string;
    active: boolean;
    tags: [string]
} 
