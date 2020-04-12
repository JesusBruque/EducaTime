import {ILection} from '../interfaces/ILection'
import Lection from '../models/lection.model'

export default class LectionService {
    constructor(){
    }
    public Create = async(lectionObject:ILection):Promise<ILection>=>{
        try {
            let err, result = await Lection.create(lectionObject);
            if(err)
                throw err;
            return result;
        } catch (error) {
            throw error;
        }
    }
}