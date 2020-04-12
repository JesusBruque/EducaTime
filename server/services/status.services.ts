import Status from '../models/status.model'
import {IStatus} from '../interfaces/IStatus'

export default class StatusServices{
    constructor(){
    }
    public create = async(statusObject:IStatus):Promise<IStatus>=>{
        try {
            let err, result = await Status.create(statusObject);
            if(err){
                throw (err);}
            return result;
        } catch (error) {
            throw (error);
        }
    }
    public edit = async (status: IStatus): Promise<IStatus> => {
        try {
            var err, res = await Status.findOneAndUpdate({ _id: status._id }, { ...status});
            if (err) throw err;
            if (!res) throw Error("No se ha editado el marcador")
            return res;
        } catch (e) {
            throw e;
        }
    }
    public delete = async (lectionId: string): Promise<Boolean> => {
        try {
            var err, res = await Status.findByIdAndDelete(lectionId);
            if (err) throw err;
            if (!res) throw Error("No se ha borrado el marcador");
            return true;
        } catch (e) {
            throw e;
        }
    }
    public findById = async (statusId: string): Promise<IStatus> => {
        try {
            var err, res = await Status.findById(statusId);
            if (err) throw err;
            if (!res) throw Error ("No se ha encontrado el marcador");
            return res;
        } catch (e) {
            throw e;
        }
    }
    /*
    public findAll = async (): Promise<IStatus[]> => {
        try {
            var err, res = await Status.find({});
            if (err) throw err;
            if (!res) throw Error ("No se han encontrado marcadores")
            return res;
        } catch (e) {
            throw e;
        }
    }
    */
}