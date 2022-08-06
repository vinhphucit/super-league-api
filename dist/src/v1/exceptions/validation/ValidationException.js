"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const BadRequestException_1 = require("../../../base/exceptions/BadRequestException");
class ValidationException extends BadRequestException_1.BadRequestException {
    constructor(message) {
        super(message || "Validation Exception");
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map