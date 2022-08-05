import {env} from "../../Env";
import {mongooseDbConnectionRegister} from "../utils/MongooseDbConnectionRegister";


import {Logger} from "../../base/utils/Logger";

if (!env.db.propertyDbUri) {
    const error = new Error("Mongodb connect problem: can not get the connection url from environment, key: SAMPLE_DB_CONNECTION");
    // tslint:disable-next-line no-console
    Logger.error(JSON.stringify(error, null, 4))
    process.exit(500);
}
const EzMongooseConnection = mongooseDbConnectionRegister(env.db.propertyDbUri);

export default EzMongooseConnection;
