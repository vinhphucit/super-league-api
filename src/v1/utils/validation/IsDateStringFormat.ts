import {isString, registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";
import {validateDateString} from "../DateUtils";

export function IsDateStringFormat(format: string, validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {
        registerDecorator({
            name: 'isNotCorrectDateFormat',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any): boolean => isString(value) && validateDateString(value, format),
                defaultMessage: (validationArguments?: ValidationArguments): string => `${validationArguments.property} should be in ${format} format`
            }
        })
    }
}
