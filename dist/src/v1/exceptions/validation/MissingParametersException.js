"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParametersException = void 0;
const ForbiddenException_1 = require("../../../base/exceptions/ForbiddenException");
class MissingParametersException extends ForbiddenException_1.ForbiddenException {
    constructor(message) {
        super(message || "Missing Parameters Exception");
    }
}
exports.MissingParametersException = MissingParametersException;
//# sourceMappingURL=MissingParametersException.js.map