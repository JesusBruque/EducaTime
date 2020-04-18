"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middlewares_1 = __importDefault(require("../middlewares"));
var celebrate_1 = require("celebrate");
var authentication_controllers_1 = __importDefault(require("../../controllers/authentication.controllers"));
var route = express_1.Router();
exports.default = (function (app) {
    var authenticationController = new authentication_controllers_1.default;
    app.use('/authentication', route);
    route.get('/', authenticationController.check);
    route.post('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    }), authenticationController.login);
    route.delete('/', middlewares_1.default.isAuth, authenticationController.logout);
});
