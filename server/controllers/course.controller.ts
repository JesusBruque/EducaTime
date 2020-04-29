import {Request,Response} from "express";
import GenericController from "./generic.controller";
import CourseService from "../services/course.services"
import Logger from '../loaders/logger'

export default class CourseController extends GenericController{
    private courseService : CourseService;
    constructor(){
      console.log("Creando Course Controller ...");
        super(new CourseService());
        this.courseService = new CourseService();
    }
}
