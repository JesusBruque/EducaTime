"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var review_controller_1 = __importDefault(require("../../controllers/review.controller"));
var route = express_1.Router();
exports.default = (function (app) {
    var reviewController = new review_controller_1.default;
    app.use('/lection', route);
    route.get('/findAll', reviewController.findAll);
    route.get('/:blogId', reviewController.findById);
    route.post('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            title: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            video: celebrate_1.Joi.string().required(),
            duration: celebrate_1.Joi.number().required(),
            order: celebrate_1.Joi.number().required(),
            course: celebrate_1.Joi.string().required(),
            active: celebrate_1.Joi.boolean()
        }),
    }), 
    // middlewares.isAuth,
    reviewController.create);
    route.put('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            title: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            video: celebrate_1.Joi.string().required(),
            duration: celebrate_1.Joi.number().required(),
            order: celebrate_1.Joi.number().required(),
            course: celebrate_1.Joi.string().required(),
            active: celebrate_1.Joi.boolean(),
            updated_for: celebrate_1.Joi.string().required()
        }),
    }), 
    // middlewares.isAuth,
    reviewController.edit);
});
