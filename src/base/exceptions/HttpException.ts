import {BaseResponse} from "../models/dto/response/BaseResponse";

export class HttpException extends Error implements BaseResponse{
    public statusCode: number;
    public code?: string;
    public error?: string;
    public description?: string;

    constructor(statusCode?: number, code?: string, error?: string, description?: string) {
        super();
        this.statusCode = statusCode || 500;
        this.code = code;
        this.error = error;
        this.description = description;
    }
}
