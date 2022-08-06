"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(statusCode, code, error, description) {
        super();
        this.statusCode = statusCode || 500;
        this.code = code;
        this.error = error;
        this.description = description;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map