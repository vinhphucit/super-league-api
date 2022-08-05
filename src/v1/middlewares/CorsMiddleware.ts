import {Request} from 'express';
import cors from 'cors';
import {Logger} from "../../base/utils/Logger";

export const corsWhitelist = (whitelist?: string[] | string) => {
    if (!whitelist) {
        return cors();
    }
    if (typeof whitelist === 'string') {
        whitelist = whitelist.split(',');
    }
    const corsOptionsDelegate = function (req: Request, callback: (err: Error | null, options?: cors.CorsOptions) => void) {
        let corsOptions: cors.CorsOptions;
        if (whitelist.indexOf(req.header('Origin')) !== -1
        || whitelist.includes('*')) {
            corsOptions = {origin: true};
        } else {
            corsOptions = {origin: false};
        }
        callback(null, corsOptions);
    };
    return cors(corsOptionsDelegate);
};
