import {NextFunction, Request, RequestHandler, Response} from "express";
import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { RequiredPermissions } from "../utils/auth/RequiredPermissions";

// https://stackoverflow.com/questions/45986594/this-is-undefined-in-express-js-router/45987714


/**
 * This Middleware is for role, permissions checking
 * @param condition
 * @constructor
 */
export function AuthorizationMiddleware(requiredPermission: string): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            
            const {payload} = req;
            
            let payloadPermissions: string[];

            if (payload) {
                payloadPermissions = payload.permissions;
            }
            
            if (!verifyPermissions(requiredPermission, payloadPermissions)) {
                throw new BadRequestException("You don't have permission for this api")
            }

            next()
        } catch (ex) {
            return next(ex)
        }
    }
}

/**
 * check if required Permissions are in payload.permissions
 * @param requiredPermission required permission
 * @param permissions permissions in payload
 */
function verifyPermissions(requiredPermission: string, permissions: string[]): boolean {
    return permissions.includes(requiredPermission);
}


