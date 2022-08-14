"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = require("./config/morgan");
const middlewares_1 = __importDefault(require("./middlewares"));
const routes_1 = __importDefault(require("./routes"));
const limiter_1 = __importDefault(require("./utils/limiter"));
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const app = (0, express_1.default)();
app.use(morgan_1.successHandler);
app.use(morgan_1.errorHandler);
// Disable etag and x-powered-by to improve server performance
app.disable('etag').disable('x-powered-by');
// Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// It shows the real origin IP in the heroku or Cloudwatch logs
app.enable('trust proxy');
// Enable Cross Origin Resource Sharing to all origins by default
app.use((0, cors_1.default)());
// gzip compression
app.use((0, compression_1.default)());
// Set security headers with helmet middleware
app.use((0, helmet_1.default)());
app.use(limiter_1.default);
app.use((0, hpp_1.default)());
// Transforms the raw string of req.body into json
app.use(express_1.default.json({ limit: '20mb' }));
app.use(express_1.default.urlencoded({ limit: '20mb', extended: false }));
app.get('/status', (req, res) => {
    res.status(http_status_1.default.OK).end();
});
app.head('/status', (req, res) => {
    res.status(http_status_1.default.OK).end();
});
app.use('/', middlewares_1.default.rateLimiter);
app.use('/', routes_1.default);
// Index route
app.get('/', (req, res) => res.status(http_status_1.default.OK).json({
    message: `${req.ip}: Welcome`,
}));
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not found'));
});
app.use(middlewares_1.default.errorConverter);
app.use(middlewares_1.default.ErrorHandler);
exports.default = app;
