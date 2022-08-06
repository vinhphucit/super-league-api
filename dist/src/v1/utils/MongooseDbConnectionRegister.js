"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseDbConnectionRegister = void 0;
// Import the mongoose module
const mongoose_1 = __importDefault(require("mongoose"));
function mongooseDbConnectionRegister(mongooseConnectionUrl) {
    if (!mongooseConnectionUrl) {
        const error = new Error("Mongodb connect problem: can not get the connection url");
        // tslint:disable-next-line no-console
        console.log(JSON.stringify(error, null, 4));
        process.exit(500);
    }
    mongoose_1.default.set('debug', true);
    // mongoose.set("useCreateIndex", true);
    // Set up default mongoose connection
    /**
     * (node:3194) DeprecationWarning: The option `reconnectTries` is incompatible with the unified topology, please read more by visiting http://bit.ly/2D8WfT6
     *(Use `node --trace-deprecation ...` to show where the warning was created)
     *(node:3194) DeprecationWarning: The option `reconnectInterval` is incompatible with the unified topology, please read more by visiting http://bit.ly/2D8WfT6
     */
    const options = {};
    const newMongoDbConnection = mongoose_1.default.createConnection(mongooseConnectionUrl, options);
    // newMongoDbConnection.catch((err: Error) => {
    //     // tslint:disable-next-line no-console
    //     console.log(JSON.stringify(err, null, 4));
    //     process.exit(500);
    // });
    newMongoDbConnection.on("reconnect", (event) => {
        // tslint:disable-next-line no-console
        console.log("dbevent: reconnected");
    });
    return newMongoDbConnection;
}
exports.mongooseDbConnectionRegister = mongooseDbConnectionRegister;
//# sourceMappingURL=MongooseDbConnectionRegister.js.map