"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotEmptyString = void 0;
const class_validator_1 = require("class-validator");
function IsNotEmptyString(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'isNotEmptyString',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value) => (0, class_validator_1.isString)(value) && (0, class_validator_1.isNotEmpty)(value.trim()),
                defaultMessage: (validationArguments) => `${validationArguments.property} should not be an empty string`
            }
        });
    };
}
exports.IsNotEmptyString = IsNotEmptyString;
//# sourceMappingURL=IsNotEmptyString.js.map