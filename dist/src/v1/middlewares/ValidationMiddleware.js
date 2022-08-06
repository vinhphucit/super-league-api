"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Logger_1 = require("../../base/utils/Logger");
const InternalServerException_1 = require("../../base/exceptions/InternalServerException");
const ValidationException_1 = require("../exceptions/validation/ValidationException");
function ValidationMiddleware(type, skipMissingProperties = false) {
    function getMessageFromError(errors) {
        let errorMessage = [];
        if (!errors)
            return undefined;
        for (const error of errors) {
            let messageObj = {};
            if (!error)
                continue;
            const { constraints, property, value, children } = error;
            if (error.constraints) {
                if (constraints) {
                    messageObj[property] = Object.values(constraints);
                    errorMessage.push(Object.values(constraints));
                }
            }
            if (children && children.length > 0) {
                const childMessage = getMessageFromError(children);
                if (childMessage) {
                    errorMessage.push(`${property}:[${childMessage}]`);
                }
            }
        }
        return errorMessage.length > 0 ? errorMessage.join(',') : "";
    }
    return (req, res, next) => {
        (0, class_validator_1.validate)((0, class_transformer_1.plainToClass)(type, req.body), { skipMissingProperties })
            .then((errors) => {
            try {
                if (errors.length > 0) {
                    const errorMessage = getMessageFromError(errors);
                    // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    next(new ValidationException_1.ValidationException(errorMessage));
                }
                else {
                    next();
                }
            }
            catch (e) {
                Logger_1.Logger.error(e);
                next(new InternalServerException_1.InternalServerException(e));
            }
        });
    };
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=ValidationMiddleware.js.map