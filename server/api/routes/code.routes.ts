import { Router } from 'express';
import CodeController from "../../controllers/code.controllers";
import middlewares from '../middlewares';
const route = Router();

export default (app:Router) => {
    const codeController = new CodeController;
    app.use('/code',route);
    route.post('/:courseId',middlewares.isAdmin, codeController.createCode);
    route.get('/checkCode/:courseId', codeController.checkCode);
}
