import { IGenericInterface } from "./IGenericInterface";

export interface IBlog extends IGenericInterface {
    title: string;
    description: string;
    urls: [string];
    creation_date: string;
    author: string;
    active: boolean;
    tags: [string]
} 