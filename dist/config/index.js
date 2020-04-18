"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var envFound = dotenv_1.default.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    //URL DE ACCESSO A MONGODB
    ATLAS_URI: process.env.ATLAS_URI,
    //
    secret: process.env.secret,
    //
    password_secret: process.env.password_secret,
    //
    SESS_NAME: process.env.SESS_NAME,
    //
    SESS_SECRET: process.env.SESS_SECRET,
    //
    SESS_LIFETIME: process.env.SESS_LIFETIME,
    //
    CLIENT_URL: process.env.CLIENT_URL,
    URL: process.env.URL,
    port: 5000,
    api: {
        prefix: '/api'
    },
    upload_dir: process.env.upload_dir,
    mode: process.env.mode
};
