"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
const figlet_1 = __importDefault(require("figlet"));
const Env_1 = require("../../Env");
const Logger_1 = require("./Logger");
function banner(content) {
    return new Promise((resolve, reject) => {
        figlet_1.default.text(content, (error, data) => {
            if (error) {
                return reject();
            }
            Logger_1.Logger.info(`\n ${data} \n `);
            const route = () => `API Info     : ${Env_1.env.app.host}:${Env_1.env.app.port} `;
            Logger_1.Logger.info(`${route()}`);
            Logger_1.Logger.info(`Version      : ${Env_1.env.app.version}`);
            return resolve();
        });
    });
}
exports.banner = banner;
//# sourceMappingURL=Banner.js.map