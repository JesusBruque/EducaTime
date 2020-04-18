"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generic_services_1 = __importDefault(require("./generic.services"));
var bookmark_model_1 = __importDefault(require("../models/bookmark.model"));
var BookmarkServices = /** @class */ (function (_super) {
    __extends(BookmarkServices, _super);
    function BookmarkServices() {
        return _super.call(this, bookmark_model_1.default) || this;
    }
    return BookmarkServices;
}(generic_services_1.default));
exports.default = BookmarkServices;
