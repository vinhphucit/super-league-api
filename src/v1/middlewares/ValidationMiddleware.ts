import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {RequestHandler} from 'express';
import { Logger } from '../../base/utils/Logger';
import {InternalServerException} from "../../base/exceptions/InternalServerException";
import {ValidationException} from "../exceptions/validation/ValidationException";


export function ValidationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
    function getMessageFromError(errors: ValidationError[]): string {
        let errorMessage = []
        if (!errors) return undefined;
        for (const error of errors) {
            let messageObj: any = {};
            if (!error) continue;
            const {constraints, property, value, children} = error;
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
        validate(plainToClass(type, req.body), {skipMissingProperties})
            .then((errors: ValidationError[]) => {
                try {
                    if (errors.length > 0) {
                        const errorMessage = getMessageFromError(errors);
                        // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                        next(new ValidationException(errorMessage));
                    } else {
                        next();
                    }
                } catch (e) {
                    Logger.error(e)
                    next(new InternalServerException(e));
                }

            });
    };
}
