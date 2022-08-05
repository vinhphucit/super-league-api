import {StatusCodes} from "http-status-codes";
import {BaseResponse} from "../BaseResponse";

export class SuccessResponse<T> implements BaseResponse {
    statusCode: number;
    data?: T;

    constructor(data?: T, statusCode?: number) {
        this.data = data;
        this.statusCode = statusCode || StatusCodes.OK;
    }
}
