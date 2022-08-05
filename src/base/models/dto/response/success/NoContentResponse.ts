import {StatusCodes} from "http-status-codes";
import {SuccessResponse} from "./SuccessResponse";

export class NoContentResponse extends SuccessResponse<undefined> {
    constructor() {
        super(null, StatusCodes.NO_CONTENT);
    }
}
