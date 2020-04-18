"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authentication_routes_1 = __importDefault(require("./routes/authentication.routes"));
var lection_routes_1 = __importDefault(require("./routes/lection.routes"));
var blog_routes_1 = __importDefault(require("./routes/blog.routes"));
var course_routes_1 = __importDefault(require("./routes/course.routes"));
var order_routes_1 = __importDefault(require("./routes/order.routes"));
var bookmark_routes_1 = __importDefault(require("./routes/bookmark.routes"));
exports.default = (function () {
    var app = express_1.Router();
    authentication_routes_1.default(app);
    lection_routes_1.default(app);
    blog_routes_1.default(app);
    course_routes_1.default(app);
    order_routes_1.default(app);
    bookmark_routes_1.default(app);
    blog_routes_1.default(app);
    return app;
});
