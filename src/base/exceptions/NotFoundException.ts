import {HttpException} from "./HttpException";
import {StatusCodes} from "http-status-codes";

export class NotFoundException extends HttpException {
    constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message || 'Not Found');
    }
}
