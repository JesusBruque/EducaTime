"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var lection_controller_1 = __importDefault(require("../../controllers/lection.controller"));
var route = express_1.Router();
exports.default = (function (app) {
    var lectionController = new lection_controller_1.default;
    app.use('/lection', route);
    route.get('/findAll', lectionController.findAll);
    route.get('/:blogId', lectionController.findById);
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
    lectionController.create);
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
    lectionController.edit);
});
