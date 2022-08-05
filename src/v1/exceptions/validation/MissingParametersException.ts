import { ForbiddenException } from "../../../base/exceptions/ForbiddenException";


export class MissingParametersException extends ForbiddenException {
    constructor(message?: string) {
        super(message || "Missing Parameters Exception");
    }
}

