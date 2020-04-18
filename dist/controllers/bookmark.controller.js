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
var generic_controller_1 = __importDefault(require("./generic.controller"));
var bookmark_services_1 = __importDefault(require("../services/bookmark.services"));
var BookmarkController = /** @class */ (function (_super) {
    __extends(BookmarkController, _super);
    function BookmarkController() {
        // this.bookmarkService=new BookmarkServices();
        return _super.call(this, new bookmark_services_1.default()) || this;
    }
    return BookmarkController;
}(generic_controller_1.default));
exports.default = BookmarkController;
