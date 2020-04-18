"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var course_controller_1 = __importDefault(require("../../controllers/course.controller"));
var route = express_1.Router();
exports.default = (function (app) {
    var courseController = new course_controller_1.default;
    app.use('/course', route);
    route.get('/findAll', courseController.findAll);
    route.get('/:courseId', courseController.findById);
    route.post('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            title: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            video: celebrate_1.Joi.string().required(),
            duration: celebrate_1.Joi.number().required(),
            requirements: celebrate_1.Joi.array(),
            category: celebrate_1.Joi.array().required(),
            fee: celebrate_1.Joi.number().required(),
            last_update: celebrate_1.Joi.string().required(),
            goals: celebrate_1.Joi.array(),
            tags: celebrate_1.Joi.array(),
            active: celebrate_1.Joi.boolean()
        }),
    }), 
    // middlewares.isAuth,
    courseController.create);
    route.put('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            title: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            video: celebrate_1.Joi.string().required(),
            duration: celebrate_1.Joi.number().required(),
            requirements: celebrate_1.Joi.array(),
            category: celebrate_1.Joi.array().required(),
            fee: celebrate_1.Joi.number().required(),
            last_update: celebrate_1.Joi.string().required(),
            goals: celebrate_1.Joi.array(),
            tags: celebrate_1.Joi.array(),
            active: celebrate_1.Joi.boolean(),
            updated_for: celebrate_1.Joi.string().required()
        }),
    }), 
    // middlewares.isAuth,
    courseController.edit);
});
