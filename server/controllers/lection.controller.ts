import { Request, Response } from "express";
import GenericController from "./generic.controller";
import LectionService from "../services/lection.services";
import Logger from "../loaders/logger";
import moment from "moment";
import { IUsuarioDTO } from "../interfaces/IUsuario";
import AuthenticationService from "../services/authentication.services";

export default class LectionController extends GenericController {
    lectionService: LectionService;
    authenticationService: AuthenticationService;
    constructor() {
        super(new LectionService());
        this.lectionService = new LectionService();
        this.authenticationService = new AuthenticationService();
    }
    public findById = async (req: Request, res: Response) => {
        try {
            const lection = await this.lectionService.findById(req.params.id);
            return res.status(200).json({ Lection: lection });
        } catch (e) {
            Logger.error('Error obteniendo una leccion por id.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    };
    public uploadLectionVideo = async (req: Request, res: Response) => {
        Logger.debug('Subiendo fichero...');
        try {
            const lectionId = req.params.lectionId;
            req.pipe(req.busboy);
            let fileLocation: string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file', async (fieldname, file, filename) => {
                fileLocation = await this.lectionService.uploadFile(lectionId, file, filename, req.query.video, req.query.needAuth).catch(err => { throw err });
                const lection = await this.lectionService.updateLectionVideos(lectionId, fileLocation);
                return res.status(200).json({ lection: lection });
            });
        } catch (e) {
            Logger.error('Error al subir un fichero para una leccion.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public uploadEvaluationResource = async (req: Request, res: Response) => {
        Logger.debug('Subiendo fichero de evaluacion...');
        try {
            const lectionId = req.params.lectionId;
            req.pipe(req.busboy);
            let fileLocation: string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file', async (fieldname, file, filename) => {
                fileLocation = await this.lectionService.uploadEvaluationFiles(lectionId, file, filename, req.query.video, req.query.needAuth).catch(err => { throw err });
                const lection = await this.lectionService.updateLectionEvaluations(lectionId, fileLocation);
                return res.status(200).json({ lection: lection });
            });
        } catch (e) {
            Logger.error('Error al subir un fichero para una leccion.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public uploadResource = async (req: Request, res: Response) => {
        Logger.debug('Subiendo fichero...');
        try {
            const lectionId = req.params.lectionId;
            const resource = req.params.resource;
            req.pipe(req.busboy);
            let fileLocation: string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file', async (fieldname, file, filename) => {
                fileLocation = await this.lectionService.uploadResourceFile(lectionId, resource, file, filename, req.query.video, req.query.needAuth).catch(err => { throw err });
                const lection = await this.lectionService.updateLectionResources(lectionId, fileLocation);
                return res.status(200).json({ lection: lection });
            });
        } catch (e) {
            Logger.error('Error al subir un fichero para una leccion.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public uploadHomeworkTask = async (req: Request, res: Response) => {
        Logger.debug('Subiendo tarea...');
        try {
            const lectionId = req.params.lectionId;
            const homeworkId = req.params.homeworkId;
            req.pipe(req.busboy);
            let fileLocation: string;
            /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
            req.busboy.on('file', async (fieldname, file, filename) => {
                fileLocation = await this.lectionService.uploadHomeworkFile(lectionId, homeworkId, file, filename, req.query.video, req.query.needAuth).catch(err => { throw err });
                const lection = await this.lectionService.updateLectionTasks(lectionId, fileLocation);
                return res.status(200).json({ lection: lection });
            });
        } catch (e) {
            Logger.error('Error al subir una tarea para una leccion.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public uploadEvaluationResponse = async (req: Request, res: Response) => {
        Logger.debug('Validando respuesta evaluacion...');
        try {
            const lectionId = req.params.lectionId;
            const evaluationId = req.params.evaluationId;
            const userId = (req.user as IUsuarioDTO)._id;
            let err1, lection = await this.lectionService.findById(lectionId);
            if (err1) throw err1;
            if (!lection) throw Error("No se ha encontrado la lecci??n.")
            const countH = lection.evaluations.length;
            for (let i = 0; i < countH; i++) {
                Logger.debug('Buscando evaluation...');
                if (lection.evaluations[i]._id == evaluationId) {
                    Logger.debug('Encontrada evaluation...');
                    const countR = lection.evaluations[i].userResponses.length;
                    for (let j = 0; j < countR; j++) {
                        if (lection.evaluations[i].userResponses[j].UserID == userId) {
                            return res.status(999).json({ message: 'Ya subiste una respuesta a esta tarea.', evaluationsResponseStatus: lection.evaluations[i].userResponses[j].status });
                        }
                        if (moment.now() > lection.evaluations[i].deadline) {
                            return res.status(999).json({ message: 'Ha expirado el per??odo h??bil para entregar respuestas a esta tarea.', deadline: lection.evaluations[i].deadline });
                        }
                    }
                    Logger.debug('Subiendo respuesta evaluacion...');
                    req.pipe(req.busboy);
                    let fileLocation: string;
                    /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
                    req.busboy.on('file', async (fieldname, file, filename) => {
                        fileLocation = await this.lectionService.uploadEvaluationResponse(lectionId, evaluationId, userId, file, filename, req.query.video, req.query.needAuth).catch(err => { throw err });
                        const lection = await this.lectionService.updateEvaluationResponseInLection(lectionId, evaluationId, userId, fileLocation);
                        await this.authenticationService.updateEvaluationResponse(lectionId, evaluationId, userId, fileLocation);
                        return res.status(200).json({ lection: lection });
                    });
                }
            }
        } catch (e) {
            Logger.error('Error al subir una respuesta de evaluacion.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public uploadHomeworkResponse = async (req: Request, res: Response) => {
        Logger.debug('Validando respuesta tarea...');
        try {
            const lectionId = req.params.lectionId;
            const homeworkId = req.params.homeworkId;
            const userId = (req.user as IUsuarioDTO)._id;
            let err1, lection = await this.lectionService.findById(lectionId);
            if (err1) throw err1;
            if (!lection) throw Error("No se ha encontrado la lecci??n.")
            const countH = lection.homework.length;
            for (let i = 0; i < countH; i++) {
                Logger.debug('Buscando tarea...');
                if (lection.homework[i]._id == homeworkId) {
                    Logger.debug('Encontrada tarea...');
                    const countR = lection.homework[i].userResponses.length;
                    for (let j = 0; j < countR; j++) {
                        if (lection.homework[i].userResponses[j].UserID == userId) {
                            return res.status(999).json({ message: 'Ya subiste una respuesta a esta tarea.', homeworkResponseStatus: lection.homework[i].userResponses[j].status });
                        }
                        if (moment.now() > lection.homework[i].deadline) {
                            return res.status(999).json({ message: 'Ha expirado el per??odo h??bil para entregar respuestas a esta tarea.', deadline: lection.homework[i].deadline });
                        }
                    }
                    Logger.debug('Subiendo tarea...');
                    req.pipe(req.busboy);
                    let fileLocation: string;
                    /*--- DETECCION DE FICHERO Y SUBIDA A S3 ---*/
                    req.busboy.on('file', async (fieldname, file, filename) => {
                        fileLocation = await this.lectionService.uploadHomeworkResponse(lectionId, homeworkId, userId, file, filename, req.query.video, req.query.needAuth).catch(err => { throw err });
                        const lection = await this.lectionService.updateHomeworkResponseInLection(lectionId, homeworkId, userId, fileLocation);
                        await this.authenticationService.updateHomeworkResponse(lectionId, homeworkId, userId, fileLocation);
                        return res.status(200).json({ lection: lection });
                    });
                }
            }
        } catch (e) {
            Logger.error('Error al subir una respuesta de tarea.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public updateLectionDates = async (req: Request, res: Response) => {
        try {
            const lectionId = req.params.lectionId;
            const lection = await this.lectionService.updateLectionDates(lectionId, req.body.fechaInicio, req.body.fechaFin);
            return res.status(200).json({ lection: lection });
        } catch (e) {
            Logger.error('Error al actualizar las fechas de la leccion.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public updateHomeworkDeadline = async (req: Request, res: Response) => {
        try {
            const lection = await this.lectionService.updateHomeworkDeadline(req.params.taskId, req.body.fechaLimite);
            return res.status(200).json({ lection: lection });
        } catch (e) {
            Logger.error('Error al actualizar las fechas de la leccion.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public updateEvaluationDate = async (req: Request, res: Response) => {
        try {
            const lection = await this.lectionService.updateEvaluationDeadLine(req.params.evaluationId, req.body.fechaLimite);
            return res.status(200).json({ lection: lection });
        } catch (e) {
            Logger.error('Error al actualizar las fechas de la leccion.');
            Logger.error(e);
            return res.status(400).json({ status: 400 });
        }
    }
    public deleteFullLection = async (req: Request, res: Response) => {
        Logger.debug('eliminando leccion');
        try {
            const lectionId = req.body.lectionId;
            const lectionOrder = (await this.lectionService.findById(lectionId)).order;

            await this.lectionService.hardDelete(lectionId);
            await this.lectionService.delete(lectionId);
            Logger.debug('leccion eliminada');
            return res.status(200).json({ status: 200, Order: lectionOrder });
        } catch (e) {
            return res.status(400).json({ status: 400 });
        }
    }
    public deleteTeoricalResource = async (req: Request, res: Response) => {
        Logger.debug('eliminando recurso teorico');
        try {
            const lectionId = req.query.lectionId as string;
            const lection = (await this.lectionService.findById(lectionId));
            const teoricalResourceId = req.params.teoricalResourceId;
            const files = [];
            for (let i = 0; i < lection.teoricalResources.length; i++) {
                if (lection.teoricalResources[i]._id == teoricalResourceId) {
                    files.concat(lection.teoricalResources[i].url);
                    lection.teoricalResources.splice(i, 1);
                    break;
                }
            }
            await lection.save();
            await this.lectionService.deleteAnyResources(files);
            Logger.debug('recurso teorico eliminado');
            return res.status(200).json({ status: 200, lection: lection });
        } catch (e) {
            return res.status(400).json({ status: 400 });
        }
    }
    public deleteHomework = async (req: Request, res: Response) => {
        Logger.debug('eliminando tareas...');
        try {
            const lectionId: string = req.query.lectionId as string;
            const lection = (await this.lectionService.findById(lectionId));
            const homeworkId: string = req.query.homeworkId as string;
            var files = [];
            Logger.debug('Iniciando variables correcto');
            for (let i = 0; i < lection.homework.length; i++) {
                if (lection.homework[i]._id == homeworkId) {
                    Logger.debug('Encontro la tarea');
                    files.push(lection.homework[i].uploadFile);
                    lection.homework.splice(i, 1);
                    break;
                }
            }
            await lection.save();
            Logger.debug('Termino el ciclo');
            await this.lectionService.deleteAnyResources(files);
            Logger.debug('recurso teorico eliminado');
            return res.status(200).json({ status: 200, lection: lection });
        } catch (e) {
            return res.status(400).json({ status: 400 });
        }
    }
    public deleteVideoResource = async (req: Request, res: Response) => {
        Logger.debug('eliminando recurso de video');
        try {
            const lectionId = req.query.lectionId as string;
            const lection = (await this.lectionService.findById(lectionId));
            const videoId = req.params.videoId;
            const files = [];

            for (let i = 0; i < lection.video.length; i++) {
                if (lection.video[i]._id == videoId) {
                    files.push(lection.video[i].url);
                    lection.video.splice(i, 1);
                    break;
                }
            }

            await lection.save();
            await this.lectionService.deleteAnyResources(files);
            Logger.debug('video eliminado');
            return res.status(200).json({ status: 200, lection: lection });
        } catch (e) {
            return res.status(400).json({ status: 400 });
        }
    }
    public deleteEvaluation = async (req: Request, res: Response) => {
        Logger.debug('eliminando evaluacion');
        try {
            const lectionId = req.query.lectionId as string;
            const lection = (await this.lectionService.findById(lectionId));
            const evaluationId = req.params.evaluationId;
            const files = [];

            for (var i = 0; i < lection.evaluations.length; i++) {
                if (lection.evaluations[i]._id == evaluationId) {
                    files.push(lection.evaluations[i].uploadFile);
                    lection.evaluations.splice(i, 1);
                    break;
                }
            }

            await lection.save();
            await this.lectionService.deleteAnyResources(files);
            Logger.debug('evaluacion eliminada');
            return res.status(200).json({ status: 200, lection: lection });
        } catch (e) {
            return res.status(400).json({ status: 400 });
        }
    }
}
