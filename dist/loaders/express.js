"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var logger_1 = __importDefault(require("./logger"));
var helmet_1 = __importDefault(require("helmet"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var passport_1 = __importDefault(require("passport"));
var api_1 = __importDefault(require("../api"));
var config_1 = __importDefault(require("../config"));
var connect_busboy_1 = __importDefault(require("connect-busboy"));
var path_1 = __importDefault(require("path"));
var passport_2 = __importDefault(require("./passport"));
var next_1 = __importDefault(require("next"));
exports.default = (function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var dev, nextApp, handle, app, corsConfig, MongoStore;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dev = config_1.default.mode !== 'prod';
                nextApp = next_1.default({ dev: dev });
                handle = nextApp.getRequestHandler();
                return [4 /*yield*/, nextApp.prepare()];
            case 1:
                _a.sent();
                app = express_1.default();
                if (config_1.default.mode === 'prod') {
                    logger_1.default.info("\n              Server in production mode\n            ");
                    // Serve the static files from the React app
                    app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend/build')));
                }
                return [4 /*yield*/, passport_2.default()];
            case 2:
                _a.sent();
                app.get('/status', function (req, res) {
                    return res.json({ hola: "hla" }).status(200);
                });
                app.head('/status', function (req, res) {
                    res.status(200).end();
                });
                app.use(express_1.default.static('../public'));
                corsConfig = {
                    origin: config_1.default.CLIENT_URL,
                    credentials: true,
                };
                app.use(cors_1.default(corsConfig));
                app.disable('x-powered-by');
                app.use(connect_busboy_1.default());
                app.use(helmet_1.default());
                app.use(express_1.default.json({ limit: '50mb' }));
                app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
                MongoStore = connect_mongo_1.default(express_session_1.default);
                app.use(express_session_1.default({
                    name: config_1.default.SESS_NAME,
                    secret: config_1.default.SESS_SECRET,
                    saveUninitialized: true,
                    resave: false,
                    store: new MongoStore({
                        mongooseConnection: connection,
                        collection: 'session',
                        ttl: parseInt(config_1.default.SESS_LIFETIME) / 1000
                    }),
                    cookie: {
                        httpOnly: true,
                        sameSite: false,
                        secure: false,
                        maxAge: parseInt(config_1.default.SESS_LIFETIME)
                    }
                }));
                app.use(passport_1.default.initialize());
                app.use(passport_1.default.session());
                app.use(config_1.default.api.prefix, express_1.default.static('api/data'));
                // Load API routes
                app.use(config_1.default.api.prefix, api_1.default());
                app.get('*', function (req, res) {
                    return handle(req, res);
                });
                return [2 /*return*/, app];
        }
    });
}); });
