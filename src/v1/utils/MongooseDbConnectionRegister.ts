// Import the mongoose module
import mongoose, { ConnectOptions } from "mongoose";

export function mongooseDbConnectionRegister(mongooseConnectionUrl: string) {
    if (!mongooseConnectionUrl) {
        const error = new Error("Mongodb connect problem: can not get the connection url");
        // tslint:disable-next-line no-console
        console.log(JSON.stringify(error, null, 4));
        process.exit(500);
    }

    mongoose.set('debug', true)
    // mongoose.set("useCreateIndex", true);
    // Set up default mongoose connection
    /**
     * (node:3194) DeprecationWarning: The option `reconnectTries` is incompatible with the unified topology, please read more by visiting http://bit.ly/2D8WfT6
     *(Use `node --trace-deprecation ...` to show where the warning was created)
     *(node:3194) DeprecationWarning: The option `reconnectInterval` is incompatible with the unified topology, please read more by visiting http://bit.ly/2D8WfT6
     */

     const options: ConnectOptions = {

     }
    const newMongoDbConnection = mongoose.createConnection(
        mongooseConnectionUrl,
        options
    );
    // newMongoDbConnection.catch((err: Error) => {
    //     // tslint:disable-next-line no-console
    //     console.log(JSON.stringify(err, null, 4));

    //     process.exit(500);
    // });

    newMongoDbConnection.on("reconnect", (event: Event) => {
        // tslint:disable-next-line no-console
        console.log("dbevent: reconnected");
    });
    return newMongoDbConnection;
}
