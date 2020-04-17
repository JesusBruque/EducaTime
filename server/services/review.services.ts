import GenericService from "./generic.services";
import Review from "../models/review.model"

export default class BlogService extends GenericService {
    constructor() {
        super(Review);
    }
}