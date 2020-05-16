import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import LectionController from '../../controllers/lection.controller';
import FilesController from "../../controllers/files.controller";
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
    const lectionController = new LectionController;
    const fileController = new FilesController;
    app.use('/lection', route);

    route.get('/findAll', lectionController.findAll)
    
    route.get('/findById/:id', lectionController.findById)

    route.delete('/deleteHomework', middlewares.isTeacherOfCourse, lectionController.deleteHomework);
    route.delete('/:lectionId',middlewares.isTeacherOfCourse,lectionController.deleteFullLection);
    route.delete('/deleteTeoricalResource/:teoricalResourceId', middlewares.isTeacherOfCourse, lectionController.deleteTeoricalResource);
    route.delete('/deleteEvaluation/:evaluationId', middlewares.isTeacherOfCourse, lectionController.deleteEvaluation);
    route.delete('/deteVideoResource/:videoId',middlewares.isTeacherOfCourse,lectionController.deleteVideoResource);
    route.post('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().required(),
                order: Joi.number().required(),
                course: Joi.string().required(),
                teoricalResources: Joi.array().items(Joi.string().allow(null)),
                homework: Joi.array().items(Joi.object({
                                                    uploadFile:Joi.string().required(),
                                                    userResponses:Joi.array().items(Joi.object({
                                                                                            UserID: Joi.string(), 
                                                                                            file: Joi.string(), 
                                                                                            date: Joi.number(), 
                                                                                            status: Joi.string(), 
                                                                                            mark: Joi.number()
                                                                                        })).allow(null),
                                                    deadline: Joi.number().required()}).allow(null)),
                evaluations: Joi.array().items(Joi.object({
                                                    uploadFile:Joi.string().required(),
                                                    userResponses:Joi.array().items(Joi.object({
                                                                                        UserID: Joi.string(), 
                                                                                        file: Joi.string(), 
                                                                                        date: Joi.number(), 
                                                                                        status: Joi.string(), 
                                                                                        mark: Joi.number()
                                                                            })).allow(null),
                                                    deadline: Joi.number().required()}).allow(null)), 
                dateAvailable: Joi.number().required(),
                dateEnd: Joi.number().required(),
                active: Joi.boolean()
            }),
        }),
        // middlewares.isAuth,
        lectionController.create);

    route.put('/',
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                video: Joi.string().required(),
                duration: Joi.number().required(),
                order: Joi.number().required(),
                course: Joi.string().required(),
                teoricalResources: Joi.array().items(Joi.string().allow(null)),
                homework: Joi.array().items(Joi.object({
                                                    uploadFile:Joi.string().required(),
                                                    userResponses:Joi.array().items(Joi.object({
                                                                                            UserID: Joi.string(), 
                                                                                            file: Joi.string(), 
                                                                                            date: Joi.number(), 
                                                                                            status: Joi.string(), 
                                                                                            mark: Joi.number()
                                                                                        })).allow(null),
                                                    deadline: Joi.number().required()}).allow(null)),
                evaluations: Joi.array().items(Joi.object({
                                                    uploadFile:Joi.string().required(),
                                                    userResponses:Joi.array().items(Joi.object({
                                                                                        UserID: Joi.string(), 
                                                                                        file: Joi.string(), 
                                                                                        date: Joi.number(), 
                                                                                        status: Joi.string(), 
                                                                                        mark: Joi.number()
                                                                            })).allow(null),
                                                    deadline: Joi.number().required()}).allow(null)), 
                dateAvailable: Joi.number().required(),
                dateEnd: Joi.number().required(),
                active: Joi.boolean(),
                updated_for: Joi.string().required()
            }),
        }),
        // middlewares.isAuth,
        lectionController.edit);
        
    route.post('/post_file/:lectionId/evaluation', middlewares.isTeacherOfCourse,lectionController.uploadEvaluationResource);
    route.post('/post_file/:lectionId', middlewares.isTeacherOfCourse,lectionController.uploadLectionVideo);
    route.post('/post_file/:lectionId/resources/teoricos',middlewares.isTeacherOfCourse,lectionController.uploadResource);
    route.post('/post_file/:lectionId/homework/:homeworkId', middlewares.isTeacherOfCourse,lectionController.uploadHomeworkTask);
    route.post('post_file/:lectionName/homework/:homeworkId/:userId', middlewares.isAuth, lectionController.uploadHomeworkResponse);

    route.get('/get_file/:filename',fileController.retrieveFile);

    route.put('/updateDates/:lectionId',middlewares.isTeacherOfCourse,lectionController.updateLectionDates);
    route.put('/updateTaskDate/:taskId',middlewares.isTeacherOfCourse,lectionController.updateHomeworkDeadline);
    route.put('/updateEvaluationDate/:evaluationId',middlewares.isTeacherOfCourse,lectionController.updateEvaluationDate);
}
