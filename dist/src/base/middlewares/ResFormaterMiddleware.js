"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResFormaterMiddleware = void 0;
const HttpException_1 = require("../exceptions/HttpException");
const InternalServerException_1 = require("../exceptions/InternalServerException");
const SuccessResponse_1 = require("../models/dto/response/success/SuccessResponse");
const Constants_1 = require("../utils/Constants");
const Logger_1 = require("../utils/Logger");
class ResFormaterMiddleware {
    handleResponse(data, request, response, next) {
        if (!data.statusCode || data.statusCode >= 400 || data.statusCode < 200) {
            let exception;
            if (!data || !(data instanceof HttpException_1.HttpException)) {
                exception = new InternalServerException_1.InternalServerException(data);
            }
            else {
                exception = data;
            }
            const code = exception.statusCode || 500;
            const error = exception.error;
            const description = exception.description || exception.code;
            if (!Constants_1.BLACKLIST_LOG.includes(request.originalUrl) && !request.originalUrl.startsWith(Constants_1.SWAGGER_PATH)) {
                Logger_1.Logger.info(`<-- ${code} Method: ${request.method}, URL: ${request.originalUrl}`);
                Logger_1.Logger.info(` Data : ${JSON.stringify({
                    code,
                    error,
                    description
                })}`);
            }
            response
                .status(code)
                .send({
                code,
                error,
                description
            });
        }
        else {
            if (data instanceof SuccessResponse_1.SuccessResponse) {
                if (!Constants_1.BLACKLIST_LOG.includes(request.originalUrl) && !request.originalUrl.startsWith(Constants_1.SWAGGER_PATH)) {
                    Logger_1.Logger.info(`<-- ${data.statusCode} Method: ${request.method}, URL: ${request.originalUrl}`);
                    Logger_1.Logger.info(`Data: ${(data === null || data === void 0 ? void 0 : data.data) ? JSON.stringify(data.data) : "No Data"}`);
                }
                return response.status(data.statusCode).send(data.data);
            }
            return response.status(data.statusCode)
                .send({});
        }
    }
}
exports.ResFormaterMiddleware = ResFormaterMiddleware;
//# sourceMappingURL=ResFormaterMiddleware.js.map