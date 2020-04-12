import {Request, Response} from 'express';
import LectionService from '../services/lection.services'
import {ILection} from '../interfaces/ILection'

export default class LectionController{
    private lectionService: LectionService;
    constructor(){
        this.lectionService=new LectionService();
    }
    public Create=async(myRequest:Request,myResponse:Response)=>{
        try {
            const lection = await this.lectionService.Create(myRequest.body as ILection);
            return myResponse.status(200).json({status:200,mensaje:"Lecciòn almacenada correctamente",lection:lection});            
        } catch (error) {
            console.error("Ha ocurrido un error al ingresar una lecciòn.");
            console.error(error);
            return myResponse.status(400).json({mensaje:"Ha ocurrido un error al crear una lecciòn."});
        }
    }
}