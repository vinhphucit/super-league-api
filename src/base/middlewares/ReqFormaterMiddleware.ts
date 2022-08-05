import {NextFunction, Request, Response} from 'express';

import {BLACKLIST_LOG, SWAGGER_PATH} from "../utils/Constants";
import {Logger} from "../utils/Logger";

export class ReqFormaterMiddleware {
    public handleRequest(request: Request, response: Response, next: NextFunction) {
        
        const {method, url, body, originalUrl} = request;
        if (!BLACKLIST_LOG.includes(url) && !originalUrl.startsWith(SWAGGER_PATH)) {
            Logger.info("--> Method:" + method + " --> " + originalUrl);            
        }
        next()
    }
}
