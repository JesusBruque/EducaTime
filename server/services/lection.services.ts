import GenericService from './generic.services';
import Lection from "../models/lection.model"

export default class LectionService extends GenericService{
    constructor(){
        super(Lection);
    }
    //#region 
    // public create = async(lectionObject:ILection, user: IUsuarioDTO):Promise<ILection>=>{
    //     try {
    //         var err, result = await new Lection({ ...lectionObject, updated_for: user._id }).save();
    //         if (err) throw err;
    //         if (!result) throw Error("No se ha creado la leccion.")
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // public edit = async (lection: ILection, user: IUsuarioDTO): Promise<ILection> => {
    //     try {
    //         var err, res = await Lection.findOneAndUpdate({ _id: lection._id }, { ...lection, updated_for: user._id });
    //         if (err) throw err;
    //         if (!res) throw Error("No se ha editado la leccion")
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public delete = async (lectionId: string): Promise<Boolean> => {
    //     try {
    //         var err, res = await Lection.findByIdAndDelete(lectionId);
    //         if (err) throw err;
    //         if (!res) throw Error("No se ha borrado la leccion");
    //         return true;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public findById = async (lectionId: string): Promise<ILection> => {
    //     try {
    //         var err, res = await Lection.findById(lectionId);
    //         if (err) throw err;
    //         if (!res) throw Error ("No se ha encontrado la leccion");
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    // public findAll = async (): Promise<ILection[]> => {
    //     try {
    //         var err, res = await Lection.find({});
    //         if (err) throw err;
    //         if (!res) throw Error ("No se han encontrado lecciones")
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }
    //#endregion
}