import axios from 'axios';
const BLOG_URL = process.env.API_URL + '/api/blog';
import {genericValidator,email} from "./Validators";
import moment from 'moment';

export const getBlogById = (blogId:string) => axios.get(BLOG_URL+'/findById/'+blogId);
export default class Blog{
    public title:string;
    public subtitle:string;
    public description:string;
    public thumbnail:string;
    public urls:string[];
    public creation_date:number;
    public author:string;
    public active:boolean;
    public tags:string[];

    constructor(){
        this.title = '';
        this.description = '';
        this.subtitle = '';
        this.thumbnail = '';
        this.urls = [];
        this.author = '';
        this.active = true;
        this.creation_date = Date.now();
    }
}


export const validate = (blog:Blog) => {
    return new Promise((resolve,reject) => {
        let validations = {
            title:genericValidator(blog.title,'required'),
            thumbnail:genericValidator(blog.thumbnail,'required'),
            description:genericValidator(blog.description,'required'),
            author: genericValidator(blog.author,'required')
        };

        let errors = [];
        for (let property in validations){
            if(validations[property] !== '') errors.push({[getPropertyName(property)]:validations[property]});
        }
        errors.length>0 ? reject(errors) : resolve('No hay errores');
    });
};

export const uploadBlogFile = (file:File) => {
    let data = new FormData();
    data.append('file',file);
    return axios.post(BLOG_URL+'/post_file', data);
};
export const create = (blog:Blog) =>axios.post(BLOG_URL,blog);
export const edit = (blog:Blog) =>  axios.put(BLOG_URL,blog);
export const deleteBlog = (blog:string) => axios.delete(BLOG_URL+'/'+blog);
function getPropertyName(property){
    switch (property) {
        case 'title':
            return 'Título';
        case 'description':
            return 'Descripción';
        case 'thumbnail':
            return 'Imagen de portada';
        case 'authro':
            return 'Autor';
    }
}
