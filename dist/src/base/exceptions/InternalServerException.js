"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerException = void 0;
const HttpException_1 = require("./HttpException");
const http_status_codes_1 = require("http-status-codes");
class InternalServerException extends HttpException_1.HttpException {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message || 'Internal Server Exception');
    }
}
exports.InternalServerException = InternalServerException;
//# sourceMappingURL=InternalServerException.js.map