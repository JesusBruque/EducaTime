import GenericController from "./generic.controller";
import ReviewService from "../services/lection.services"

export default class LectionController extends GenericController{
    constructor(){
        super(new ReviewService());
      }
    }