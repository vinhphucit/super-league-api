import {NextFunction, Request, Response} from 'express';
import {BaseResponse} from "../models/dto/response/BaseResponse";
import {HttpException} from '../exceptions/HttpException';
import {InternalServerException} from "../exceptions/InternalServerException";
import {NoContentResponse} from "../models/dto/response/success/NoContentResponse";
import {SuccessResponse} from "../models/dto/response/success/SuccessResponse";
import {BLACKLIST_LOG, SWAGGER_PATH} from "../utils/Constants";
import {Logger} from "../utils/Logger";

export class ResFormaterMiddleware {
    public handleResponse(data: BaseResponse, request: Request, response: Response, next: NextFunction) {
        if (!data.statusCode || data.statusCode >= 400 || data.statusCode < 200) {
            let exception: HttpException;
            if (!data || !(data instanceof HttpException)) {
                exception = new InternalServerException(data as any);
            } else {
                exception = data;
            }

            const code = exception.statusCode || 500;
            const error = exception.error;
            const description = exception.description || exception.code;
            if (!BLACKLIST_LOG.includes(request.originalUrl) && !request.originalUrl.startsWith(SWAGGER_PATH)) {
                Logger.info(`<-- ${code} Method: ${request.method}, URL: ${request.originalUrl}`)
                Logger.info(` Data : ${JSON.stringify({
                    code,
                    error,
                    description
                })}`)
            }
            response
                .status(code)
                .send({
                    code,
                    error,
                    description
                });

        } else {
            if (data instanceof SuccessResponse) {
                if (!BLACKLIST_LOG.includes(request.originalUrl) && !request.originalUrl.startsWith(SWAGGER_PATH)) {
                    Logger.info(`<-- ${data.statusCode} Method: ${request.method}, URL: ${request.originalUrl}`)                    
                    Logger.info(`Data: ${data?.data ? JSON.stringify(data.data) : "No Data"}`)
                }
                return response.status(data.statusCode).send(data.data);

            }
            return response.status(data.statusCode)
                .send({})
        }
    }
}
