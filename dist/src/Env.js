"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const path_1 = __importDefault(require("path"));
const pkg = __importStar(require("../package.json"));
const dotenv = __importStar(require("dotenv"));
const env_1 = require("./base/utils/env");
/**
 * Load .env file or for tests the .env.tests file.
 */
if (!process.env.ENV || process.env.ENV === 'test') {
    dotenv.config({ path: path_1.default.join(process.cwd(), `${((process.env.ENV === 'test') ? '.test' : '')}.env`) });
}
exports.env = {
    app: {
        name: 'EZ-Lang-Flashcard',
        version: pkg.version,
        host: (0, env_1.getOsEnv)('HOST'),
        port: (0, env_1.getOsEnv)('PORT'),
        env: (0, env_1.getOsEnv)('ENV'),
        rootPath: (0, env_1.getOsEnv)('ROOT_PATH'),
    },
    subscriber: [path_1.default.join(__dirname, '**/subscribers/*Subscriber{.js,.ts}')],
    db: {
        propertyDbUri: (0, env_1.getOsEnv)('MONGO_DB_URI'),
    },
    cors: {
        whitelist: (0, env_1.getOsEnv)('CORS_WHITELIST'),
    }
};
//# sourceMappingURL=Env.js.map