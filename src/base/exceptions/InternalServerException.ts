import {HttpException} from "./HttpException";
import {StatusCodes} from "http-status-codes";

export class InternalServerException extends HttpException {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message || 'Internal Server Exception');
    }
}
