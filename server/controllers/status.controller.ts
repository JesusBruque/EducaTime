import StatusServices from '../services/status.services';
import {IStatus} from '../interfaces/IStatus';
import { Request, Response } from 'express';

export default class StatusController{
    private statusService:StatusServices;
    constructor(){
        this.statusService = new StatusServices;
    }
    public Create = async (myRequest:Request,myResponse:Response)=>{
        try {
            const estado = await this.statusService.Create(myRequest.body as IStatus);
            return myResponse.status(200).json({status:200,mensaje:"Se ha creado un bookmark èxito.", myStatus:estado});
        } catch (error) {
            console.error("Se ha producido un error al crear un bookmark 1.");
            console.error(error);
            return myResponse.status(400).json({mensaje:"Ha ocurrido un problema al crear un bookmark 2."});
        }
    }
}