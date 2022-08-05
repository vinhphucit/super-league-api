import {ForbiddenException} from "./ForbiddenException";

export class NotImplementedException extends ForbiddenException {
    constructor(message?: string) {
        super(message || "NotImplementedException");
    }
}

