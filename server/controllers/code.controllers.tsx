import CodeServices from "../services/code.services";
import GenericController from "./generic.controller";
import { Request, Response } from 'express';
import Logger from '../loaders/logger';

export default class CodeController extends GenericController{
    private codeService:CodeServices;
    constructor(){
        super(new CodeServices());
        this.codeService = new CodeServices();
    }
    public createCode = async(req:Request,res:Response) => {
        try{
            let codeValue = req.body.codeValue;
            let courseId = req.params.courseId;
            let code = await this.codeService.createCode(codeValue,courseId);
            return res.status(200).json({code:code});
        }catch (e) {
            Logger.error(e);
            return res.status(400).json({error:'Se ha producido un error al generar un código.'});
        }
    }
    public checkCode = async(req:Request, res:Response) => {
        try{
            let codeValue = req.query.code as string;
            let courseId = req.params.courseId;
            let code = await this.codeService.checkCode(codeValue,courseId);
            return res.status(200).json({code:code});
        }catch(err){
            Logger.error(err);
            return res.status(400).json({error:err});
        }
    }
}
