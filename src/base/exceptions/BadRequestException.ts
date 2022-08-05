import {HttpException} from "./HttpException";
import {StatusCodes} from "http-status-codes";

export class BadRequestException extends HttpException {
    constructor(message?: string) {
        super(StatusCodes.BAD_REQUEST, message || 'Bad request');
    }
}
