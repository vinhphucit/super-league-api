"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateStringFormat = void 0;
const class_validator_1 = require("class-validator");
const DateUtils_1 = require("../DateUtils");
function IsDateStringFormat(format, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'isNotCorrectDateFormat',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value) => (0, class_validator_1.isString)(value) && (0, DateUtils_1.validateDateString)(value, format),
                defaultMessage: (validationArguments) => `${validationArguments.property} should be in ${format} format`
            }
        });
    };
}
exports.IsDateStringFormat = IsDateStringFormat;
//# sourceMappingURL=IsDateStringFormat.js.map