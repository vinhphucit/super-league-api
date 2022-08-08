"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationMiddleware = void 0;
// https://stackoverflow.com/questions/45986594/this-is-undefined-in-express-js-router/45987714
/**
 * This Middleware is for role, permissions checking
 * @param condition
 * @constructor
 */
function AuthorizationMiddleware(requiredPermission) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            // const {payload} = req;
            // let payloadPermissions: string[];
            // if (payload) {
            //     payloadPermissions = payload.permissions;
            // }
            // if (!verifyPermissions(requiredPermission, payloadPermissions)) {
            //     throw new BadRequestException("You don't have permission for this api")
            // }
            next();
        }
        catch (ex) {
            return next(ex);
        }
    });
}
exports.AuthorizationMiddleware = AuthorizationMiddleware;
/**
 * check if required Permissions are in payload.permissions
 * @param requiredPermission required permission
 * @param permissions permissions in payload
 */
function verifyPermissions(requiredPermission, permissions) {
    return permissions.includes(requiredPermission);
}
//# sourceMappingURL=AuthorizationMiddleware.js.map