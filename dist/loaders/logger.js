"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var timezoned = function () {
    return new Date().toLocaleString();
};
var LoggerInstance = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.simple(), winston_1.default.format.timestamp({ format: timezoned() }), winston_1.default.format.printf(function (info) { return "[" + info.timestamp + "] " + info.level + ": " + info.message; })),
    transports: [
        new winston_1.default.transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: __dirname + "/../logs/log-casor.log"
        }),
        new winston_1.default.transports.Console({
            level: 'debug'
        })
    ]
});
exports.default = LoggerInstance;
