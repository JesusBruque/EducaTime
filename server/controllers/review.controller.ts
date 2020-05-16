import {Request,Response} from "express";
import GenericController from "./generic.controller";
import ReviewService from "../services/review.services"
import Logger from '../loaders/logger'
import CourseService from "../services/course.services";
import AuthenticationService from "../services/authentication.services";
import Usuario from '../models/usuario.model'
import Course, { getCourseById } from "../../utils/Course";

export default class ReviewController extends GenericController{
    private reviewService : ReviewService; 
    private courseService : CourseService;
    private authenticationService : AuthenticationService;
    constructor(){
        super(new ReviewService());
        this.reviewService = new ReviewService();
        this.courseService = new CourseService();
        this.authenticationService = new AuthenticationService();
      }
      public editReview = async (req:Request,res:Response) => {
        Logger.debug('Editando review...');
        try{
            let reviewId = req.params.reviewId;
            /*-- EDITANDO CURSO Y LECCIONES --*/
            let oldReview = await this.reviewService.findById(reviewId);
            await this.reviewService.edit(oldReview);
            return res.status(200).json({status:200,review:oldReview});
        }catch(e){
            Logger.error('Error al editar un review.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
    }
    public createReview = async (req:Request,res:Response) => {
        Logger.debug('Creando review...');
        
        try{
            let review = req.params.review;
            console.log(review);

            /*-- CREANDO CURSO Y LECCIONES --*/
            const newReview = await this.reviewService.create(review).catch(err => {throw err});
            await this.manageAfterCreate(newReview, req.query.cursoId, req.query.userId);
            return res.status(200).json({status:200,review:newReview});
        }catch(e){
            Logger.error('Error al crear un review.');
            Logger.error(e);
            return res.status(400).json({status:400});
        }
    }
    private manageAfterCreate = async (newReview, cursoId, userId) => {
        const user = Usuario.findById(userId);
        for(var i=0;i<(await user).cursos.length;i++){
          if((await user).cursos[i].idCurso==cursoId){
            (await user).cursos[i].review.reviewId = newReview.id;
            break;
          }
        }
        const course = (await getCourseById(cursoId)).data.Course;
        course.reviews.push(newReview.id);
    }
}