import axios from 'axios';
import {User} from "./Authentication";
const REVIEW_URL = process.env.API_URL+'/api/review';

export default class Review{
    public _id:string;
    public score:number;
    public review:string;
    public user: string;
    public course:string;
    public date:number;

    constructor(){
        this.score = 0;
        this.review = '';
        this.date = Date.now();
    }
}
export const create = (review:Review) => {
    delete review['_id'];
    return axios.post(REVIEW_URL,review); 
}
export const edit = (review:Review) => axios.put(REVIEW_URL,review);
export const getReviewById = async (reviewId: string) =>  {return axios.get(REVIEW_URL+reviewId);};
