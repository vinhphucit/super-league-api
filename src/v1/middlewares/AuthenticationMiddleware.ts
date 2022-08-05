import {NextFunction, Request, RequestHandler, Response} from "express";
import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { JwtUtils } from "../utils/auth/JwtUtils";

// https://stackoverflow.com/questions/45986594/this-is-undefined-in-express-js-router/45987714

/**
 *
 All accountId must match with user ‘acc’ JWT, propertyId must be matched with “spaces” array in the USER JWT
 */

export function AuthenticationMiddleware(): RequestHandler {
    const HEADER_AUTHORIZATION_BEARER = "Bearer";

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = req.headers.authorization;
            if (!token) {
                return next(new BadRequestException("Missing Access Token"));
            }

            if (token.startsWith(HEADER_AUTHORIZATION_BEARER)) {
                // Remove Bearer from string
                token = token.slice(HEADER_AUTHORIZATION_BEARER.length + 1, token.length).trimStart()
            } else {
                return next(new BadRequestException("Invalid Access Token"));
            }

            req.payload = await JwtUtils.verifyJwtToken(token)
            next();
        } catch (ex) {
            return next(ex)
        }
    }
}
