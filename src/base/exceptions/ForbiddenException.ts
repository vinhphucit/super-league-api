import {HttpException} from "./HttpException";
import {StatusCodes} from "http-status-codes";

export class ForbiddenException extends HttpException {
    constructor(message?: string) {
        super(StatusCodes.FORBIDDEN, message || 'Forbidden Exception');
    }
}
