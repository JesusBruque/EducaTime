import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import ReviewController from '../../controllers/review.controller';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
    const reviewController = new ReviewController;
    app.use('/lection', route);

    route.get('/findAll', reviewController.findAll)
    
    route.get('/:reviewId', reviewController.findById)

    // route.post('/',
    //     celebrate({
    //         body: Joi.object({
    //             score: Joi.number().required(),
    //             review: Joi.string(),
    //             user: Joi.string().required(),
    //             course: Joi.string().required(),
    //             date: Joi.number().required(),
    //             updated_for: Joi.string().required()
    //         }),
    //     }),
    //     // middlewares.isAuth,
    //     reviewController.createReview);

    route.put('/',
        celebrate({
            body: Joi.object({
                score: Joi.number().required(),
                review: Joi.string(),
                user: Joi.string().required(),
                course: Joi.string().required(),
                date: Joi.number().required(),
                updated_for: Joi.string().required()
            }),
        }),
        // middlewares.isAuth,
        reviewController.editReview);

}
