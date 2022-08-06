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
exports.AuthenticationMiddleware = void 0;
const BadRequestException_1 = require("../../base/exceptions/BadRequestException");
const JwtUtils_1 = require("../utils/auth/JwtUtils");
// https://stackoverflow.com/questions/45986594/this-is-undefined-in-express-js-router/45987714
/**
 *
 All accountId must match with user ‘acc’ JWT, propertyId must be matched with “spaces” array in the USER JWT
 */
function AuthenticationMiddleware() {
    const HEADER_AUTHORIZATION_BEARER = "Bearer";
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers.authorization;
            if (!token) {
                return next(new BadRequestException_1.BadRequestException("Missing Access Token"));
            }
            if (token.startsWith(HEADER_AUTHORIZATION_BEARER)) {
                // Remove Bearer from string
                token = token.slice(HEADER_AUTHORIZATION_BEARER.length + 1, token.length).trimStart();
            }
            else {
                return next(new BadRequestException_1.BadRequestException("Invalid Access Token"));
            }
            req.payload = yield JwtUtils_1.JwtUtils.verifyJwtToken(token);
            next();
        }
        catch (ex) {
            return next(ex);
        }
    });
}
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=AuthenticationMiddleware.js.map