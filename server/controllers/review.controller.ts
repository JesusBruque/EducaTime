import GenericController from "./generic.controller";
import ReviewService from "../services/review.services"

export default class ReviewController extends GenericController{
    constructor(){
        super(new ReviewService());
      }
    }