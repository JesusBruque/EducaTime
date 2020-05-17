import GenericService from './generic.services';
import Lection from "../models/lection.model";
import Logger from "../loaders/logger";
import FilesServices from './files.services';
import mongoose from "mongoose";
import { ILection } from '../interfaces/ILection';
import moment from 'moment';

export default class LectionService extends GenericService {
    fileService: FilesServices;
    constructor() {
        super(Lection);
        this.fileService = new FilesServices;
    }
    public findById = async (LectionId: string): Promise<ILection & mongoose.Document> => {
        try {
            let err, lection = await Lection.findById(LectionId);
            if (err) throw err;
            return lection;
        } catch (e) {
            throw e;
        }
    };
    public uploadFile = async (lectionName: string, file, filename, video, needAuth) => {
        try {
            const fileLocation: string = await this.fileService.uploadFile(file, lectionName, filename, video, needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        } catch (e) {
            throw e;
        }
    };
    public uploadResourceFile = async (lectionName: string, resourceName: string, file, filename, video, needAuth) => {
        try {
            const fileLocation: string = await this.fileService.uploadFile(file, lectionName + '/resources/' + resourceName, filename, video, needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        } catch (e) {
            throw e;
        }
    };
    public uploadHomeworkFile = async (lectionName: string, homeworkName: string, file, filename, video, needAuth) => {
        try {
            const fileLocation: string = await this.fileService.uploadFile(file, lectionName + '/homework/' + homeworkName, filename, video, needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        } catch (e) {
            throw e;
        }
    };
    public uploadHomeworkResponse = async (lectionName: string, homeworkName: string, userId: string, file, filename, video, needAuth) => {
        try {
            const fileLocation: string = await this.fileService.uploadFile(file, lectionName + '/homework/' + homeworkName + '/' + userId, filename, video, needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        } catch (e) {
            throw e;
        }
    };
    public uploadEvaluationResponse = async (lectionName: string, evaluationId: string, userId: string, file, filename, video, needAuth) => {
        try {
            const fileLocation: string = await this.fileService.uploadFile(file, lectionName + '/evaluation/' + evaluationId + '/' + userId, filename, video, needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        } catch (e) {
            throw e;
        }
    };
    public updateEvaluationResponseInLection = async (lectionId: string, evaluationId: string, userId: string, fileLocation: string) => {
        try {
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            if (!lection) throw Error("No se encuentra la lección")
            let tenDays = 10 * 24 * 60 * 60 * 1000;
            const countH = lection.evaluations.length;
            const userResponse = { UserID: userId, file: fileLocation, date: moment.now(), status: 'Entregado', mark: 0 }
            for (let i = 0; i < countH; i++) {
                if (lection.evaluations[i]._id == evaluationId) {
                    lection.evaluations[i].userResponses.push(userResponse);
                    break;
                }
            }
            await lection.save();
            return lection;
        } catch (e) {
            throw e;
        }
    }
    public updateHomeworkResponseInLection = async (lectionId: string, homeworkId: string, userId: string, fileLocation: string) => {
        try {
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            if (!lection) throw Error("No se encuentra la lección")
            let tenDays = 10 * 24 * 60 * 60 * 1000;
            const countH = lection.homework.length;
            const userResponse = { UserID: userId, file: fileLocation, date: moment.now(), status: 'Entregado', mark: 0 }
            for (let i = 0; i < countH; i++) {
                if (lection.homework[i]._id == homeworkId) {
                    lection.homework[i].userResponses.push(userResponse);
                    break;
                }
            }
            await lection.save();
            return lection;
        } catch (e) {
            throw e;
        }
    }
    public uploadEvaluationFiles = async (lectionName: string, file, filename, video, needAuth) => {
        try {
            const fileLocation: string = await this.fileService.uploadFile(file, lectionName + '/evaluations/', filename, video, needAuth);
            Logger.debug('fichero subido...', fileLocation);
            return fileLocation;
        } catch (e) {
            throw e;
        }
    };
    public updateLectionTasks = async (lectionId: string, taskUrl: string) => {
        try {
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            let tenDays = 10 * 24 * 60 * 60 * 1000;
            // @ts-ignore
            lection.homework.push({ uploadFile: taskUrl, name: '', userResponses: [], deadline: (Date.now() + tenDays) });
            await lection.save();
            return lection;
        } catch (e) {
            throw e;
        }
    }
    public updateLectionResources = async (lectionId: string, resourceUrl: string) => {
        try {
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            lection.teoricalResources.push({ url: resourceUrl, name: '' });
            await lection.save();
            return lection;
        } catch (e) {
            throw e;
        }
    };
    public updateLectionVideos = async (lectionId: string, videoUrl: string) => {
        try {
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            lection.video.push({ url: videoUrl, name: '' });
            await lection.save();
            return lection;
        } catch (e) {
            throw e;
        }
    };
    public updateLectionEvaluations = async (lectionId: string, evaluationURL: string) => {
        try {
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            let tenDays = 10 * 24 * 60 * 60 * 1000;
            // @ts-ignore
            lection.evaluations.push({ uploadFile: evaluationURL, name: '', userResponses: [], deadline: (Date.now() + tenDays) });
            await lection.save();
            return lection;
        } catch (e) {
            throw e;
        }
    }
    public updateLectionDates = async (lectionId: string, fechaInicio: number, fechaFin: number) => {
        try {
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            lection.dateAvailable = fechaInicio;
            lection.dateEnd = fechaFin;
            await lection.save();
            return lection;
        } catch (e) {
            throw e;
        }
    };
    public updateHomeworkDeadline = async (taskId: string, fecha: number) => {
        try {
            let err, lection = await Lection.findOne({ "homework._id": taskId });
            for (let i = 0; i < lection.homework.length; i++) {
                if (lection.homework[i]._id == taskId) {
                    lection.homework[i].deadline = fecha;
                    break;
                }
            }
            await lection.save();
            if (err) throw err;
            return lection;
        } catch (e) {
            throw e;
        }
    };
    public updateEvaluationDeadLine = async (evaluationId: string, fecha: number) => {
        try {
            let err, lection = await Lection.findOne({ "evaluations._id": evaluationId });
            for (let i = 0; i < lection.evaluations.length; i++) {
                if (lection.evaluations[i]._id == evaluationId) {
                    lection.evaluations[i].deadline = fecha;
                    break;
                }
            }
            await lection.save();
            if (err) throw err;
            return lection;
        } catch (e) {
            throw e;
        }
    }
    public hardDelete = async (lectionId: string): Promise<Boolean> => {
        try {
            let filesToDelete = [];
            let err, lections = await this.getLectionFiles(lectionId);
            if (err) throw err;
            filesToDelete.concat(lections);
            await this.fileService.removeFiles(filesToDelete);
            Logger.debug('recursos de leccion eliminados');
            return true;
        } catch (e) {
            throw e;
        }
    }
    public deleteAnyResources = async (resources: string[]) => {
        try {
            if (resources.length == 0) {
                return false;
            }
            await this.fileService.removeFiles(resources);
            Logger.debug('ficheros eliminados');
            return true;
        } catch (e) {
            throw e;
        }
    }
    public getLectionFiles = async (lectionId: string) => {
        try {
            let err, lection = await Lection.findById(lectionId);
            if (err) throw err;
            let files = [];
            /*-- RECURSOS TEORICOS, VIDEOS, TAREAS.UPLOADFILE, TAREAS.USERRESPONSES.FILE, EVALUATIONS--*/
            lection.teoricalResources.map(file => files.push(file.url));
            lection.video.map(file => files.push(file.url));
            lection.homework.map(task => { files.push(task.uploadFile); task.userResponses.map(response => files.push(response.file)) });
            lection.evaluations.map(evaluation => { files.push(evaluation.uploadFile); evaluation.userResponses.map(response => files.push(response.file)); });
            return files;
        } catch (e) {
            throw e;
        }
    }
}
