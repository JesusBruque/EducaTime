import {User} from "./Authentication";

export default class Review{
    public _id:string;
    public score:number;
    public review:string;
    public user:User;
    public course:string;
    public date:number;

    constructor(){
        this.score = 0;
        this.review = '';
        this.date = Date.now();
    }
}
