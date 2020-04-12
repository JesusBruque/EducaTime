export interface IBlog {
    _id: string;
    title: string;
    description: string;
    urls: [string];
    creation_date: Date;
    author: string;
    active: boolean;
    tags: [string]
} 