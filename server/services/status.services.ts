import Status from '../models/status.model'
import {IStatus} from '../interfaces/IStatus'

export default class StatusServices{
    constructor(){
    }
    public Create = async(statusObject:IStatus):Promise<IStatus>=>{
        try {
            let err, result = await Status.create(statusObject);
            if(err){
                throw (err);}
            return result;
        } catch (error) {
            throw (error);
        }
    }
}