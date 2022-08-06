"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedException = void 0;
const ForbiddenException_1 = require("./ForbiddenException");
class NotImplementedException extends ForbiddenException_1.ForbiddenException {
    constructor(message) {
        super(message || "NotImplementedException");
    }
}
exports.NotImplementedException = NotImplementedException;
//# sourceMappingURL=NotImplementedException.js.map