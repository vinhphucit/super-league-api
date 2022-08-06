"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const HttpException_1 = require("./HttpException");
const http_status_codes_1 = require("http-status-codes");
class BadRequestException extends HttpException_1.HttpException {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, message || 'Bad request');
    }
}
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=BadRequestException.js.map