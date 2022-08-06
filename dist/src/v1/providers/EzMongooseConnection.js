"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = require("../../Env");
const MongooseDbConnectionRegister_1 = require("../utils/MongooseDbConnectionRegister");
const Logger_1 = require("../../base/utils/Logger");
if (!Env_1.env.db.propertyDbUri) {
    const error = new Error("Mongodb connect problem: can not get the connection url from environment, key: SAMPLE_DB_CONNECTION");
    // tslint:disable-next-line no-console
    Logger_1.Logger.error(JSON.stringify(error, null, 4));
    process.exit(500);
}
const EzMongooseConnection = (0, MongooseDbConnectionRegister_1.mongooseDbConnectionRegister)(Env_1.env.db.propertyDbUri);
exports.default = EzMongooseConnection;
//# sourceMappingURL=EzMongooseConnection.js.map