import mongoose from 'mongoose';
import { IGenericInterface } from '../interfaces/IGenericInterface'
import { IUsuarioDTO } from '../interfaces/IUsuario';

export default class GenericService {

    protected mySchema: typeof mongoose.Model;

    constructor(import_Schema: typeof mongoose.Model) {
        this.mySchema = import_Schema;
    }
    public name() {
        return this.mySchema.modelName;
    }
    public create = async (myObject: any, user?: IUsuarioDTO): Promise<IGenericInterface> => {
        try {
            if (typeof user === "undefined") {
                var err, result = await new this.mySchema({ ...myObject }).save();
            }
            else {
                var err, result = await new this.mySchema({ ...myObject, updated_for: user._id }).save();
            }
            if (err) throw err;
            if (!result) throw Error("No se ha creado " + this.mySchema.modelName);
            return result;
        } catch (error) {
            throw (error);
        }
    }
    public edit = async (myObject: IGenericInterface, user?: IUsuarioDTO): Promise<void> => {
        try {
            if (typeof user === "undefined") {
                var err, res = await this.mySchema.findOneAndUpdate({ _id: myObject._id }, { ...myObject });
            }
            else {
                var err, res = await this.mySchema.findOneAndUpdate({ _id: myObject._id }, { ...myObject, updated_for: user._id });
            }
            if (err) throw err;
            if (!res) throw Error("Error en editar " + this.mySchema.modelName);
        } catch (e) {
            throw e;
        }
    }
    public delete = async (objectId: string): Promise<void> => {
        try {
            var err, res = await this.mySchema.findByIdAndDelete(objectId);
            if (err) throw err;
            if (!res) throw Error("No se ha borrado " + this.mySchema.modelName);
        } catch (e) {
            throw e;
        }
    }
    public findById = async (objectId: string): Promise<IGenericInterface> => {
        try {
            var err, res = await this.mySchema.findById(objectId);
            if (err) throw err;
            if (!res) throw Error("No se ha encontrado " + this.mySchema.modelName);
            return res;
        } catch (e) {
            throw e;
        }
    }
    public findAll = async (): Promise<IGenericInterface[]> => {
        try {
            var err, res = await this.mySchema.find({});
            if (err) throw err;
            if (!res) throw Error("No se han encontrado " + this.mySchema.modelName)
            return res;
        } catch (e) {
            throw e;
        }
    }
}
