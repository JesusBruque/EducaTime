import GenericService from "./generic.services";
import Review from "../models/review.model"
import Course from "../models/course.model";
import { IGenericInterface } from "../interfaces/IGenericInterface";
import { IUsuarioDTO } from "../interfaces/IUsuario";

export default class ReviewService extends GenericService {
    constructor() {
        super(Review);
        
    }
    // public create= async (myObject: IGenericInterface, user?: IUsuarioDTO): Promise<IGenericInterface> => {
    //     await this.addRating(myObject._id);
    //     return this.create(myObject,user);
    // }
    // private addRating = async (reviewId: string)=>{
    //     const rev = await (Review.findById(reviewId));
    //     const curso = await Course.findById(rev.course);
    //     curso.reviews.push(rev);
    //    //  Actualizando el score guay
    //     curso.score += parseFloat(((rev.score - curso.score)/(curso.reviews.length+1)).toFixed(3));
    //     await curso.save();
    // }
}
