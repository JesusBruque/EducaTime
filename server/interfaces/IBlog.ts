export interface IBlog {
    _id: string;
    title: string;
    description: string;
    urls: [string];
    creation_date: string;
    author: string;
    active: boolean;
    tags: [string]
} 