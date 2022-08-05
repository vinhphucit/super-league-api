import {NextFunction, Request, Response} from "express";
import {NotFoundException} from "../../base/exceptions/NotFoundException";

export class NotFoundController {
    constructor() {
    }


    public handleNotFoundUrl = async (req: Request, res: Response, next: NextFunction) => {
        return next(new NotFoundException())
    }
}
