"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GenericService = /** @class */ (function () {
    function GenericService(import_Schema) {
        var _this = this;
        this.create = function (myObject, user) { return __awaiter(_this, void 0, void 0, function () {
            var err, result, err, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof user === "undefined")) return [3 /*break*/, 2];
                        return [4 /*yield*/, new this.mySchema(__assign({}, myObject)).save()];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, new this.mySchema(__assign(__assign({}, myObject), { updated_for: user._id })).save()];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (err)
                            throw err;
                        if (!result)
                            throw Error("No se ha creado " + this.mySchema.modelName);
                        return [2 /*return*/, result];
                    case 5:
                        error_1 = _a.sent();
                        throw (error_1);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.edit = function (myObject, user) { return __awaiter(_this, void 0, void 0, function () {
            var err, res, err, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof user === "undefined")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mySchema.findOneAndUpdate({ _id: myObject._id }, __assign({}, myObject))];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.mySchema.findOneAndUpdate({ _id: myObject._id }, __assign(__assign({}, myObject), { updated_for: user._id }))];
                    case 3:
                        res = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (err)
                            throw err;
                        if (!res)
                            throw Error("Error en editar " + this.mySchema.modelName);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (objectId) { return __awaiter(_this, void 0, void 0, function () {
            var err, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.mySchema.findByIdAndDelete(objectId)];
                    case 1:
                        res = _a.sent();
                        if (err)
                            throw err;
                        if (!res)
                            throw Error("No se ha borrado " + this.mySchema.modelName);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.findById = function (objectId) { return __awaiter(_this, void 0, void 0, function () {
            var err, res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.mySchema.findById(objectId)];
                    case 1:
                        res = _a.sent();
                        if (err)
                            throw err;
                        if (!res)
                            throw Error("No se ha encontrado " + this.mySchema.modelName);
                        return [2 /*return*/, res];
                    case 2:
                        e_3 = _a.sent();
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.findAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var err, res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.mySchema.find({})];
                    case 1:
                        res = _a.sent();
                        if (err)
                            throw err;
                        if (!res)
                            throw Error("No se han encontrado " + this.mySchema.modelName);
                        return [2 /*return*/, res];
                    case 2:
                        e_4 = _a.sent();
                        throw e_4;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.mySchema = import_Schema;
    }
    GenericService.prototype.name = function () {
        return this.mySchema.modelName;
    };
    return GenericService;
}());
exports.default = GenericService;
