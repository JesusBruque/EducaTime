import {ICode} from "../interfaces/ICode";
import GenericService from "./generic.services";
import Code from '../models/code.model';

export default class CodeServices extends GenericService{
    constructor(){
        super(Code);
    }
    public createCode = async(codeValue:number, courseId:string) : Promise<ICode> =>{
        try{
            let codeCode = this.generateRandomCode();
            let err, code = await Code.findOne({code:codeCode,course:courseId});
            if(code) this.createCode(codeValue,courseId);
            code = await new Code({code:codeCode,value:codeValue,used:false, course:courseId}).save();
            return code;
        }catch(err){
            throw err;
        }
    }
    public checkCode = async(codeValue:string, courseId:string): Promise<ICode> => {
        try{
            let err, code = await Code.findOne({code:codeValue,course:courseId});
            if(err) throw err;
            if(!code) throw Error('No se ha encontrado ningún código con este valor.');
            if(code.used) throw Error('Este código ya ha sido usado.');
            return code;
        }catch(err){
            throw err;
        }
    };

    public getCodeValue = async(codeValue:string, courseId:string) : Promise<number> => {
        try{
            let code = await this.checkCode(codeValue, courseId);
            return code.value;
        }catch(e){
            throw e;
        }
    };

    public applyCode = async(codeId:string) : Promise<ICode>=> {
        try{
            let err, code = await Code.findById(codeId);
            if(err) throw err;
            if(!code) throw Error('No hay codigo con este Id');
            code.used = true;
            await code.save();
            return code;
         }catch(err){
            throw err;
        }
    }

    private generateRandomCode = () : string => {
        const characters = "abcdefghijklmnopqrstuvwyz0123456789";
        let longitud = 7;
        let code = '';
        for(let i = 0; i<longitud;i++){
            let index = Math.floor(Math.random()*(characters.length-1));
            let selection = characters.split('')[index];
            code = code.concat(selection);
        }
        return code;
    }
}
