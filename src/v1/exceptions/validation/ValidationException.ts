import {BadRequestException} from "../../../base/exceptions/BadRequestException";

export class ValidationException extends BadRequestException {
    constructor(message?: string) {
        super(message || "Validation Exception");
    }
}
