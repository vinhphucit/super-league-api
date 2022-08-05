import { ISeason } from "../dao/Season";

export class SeasonDomain {
    id: string;
    title: string;
    description: string;
    creatorId: string;    
    status: string;
    createdAt: Date;
    updatedAt: Date;
    constructor() ;
    constructor(result: ISeason);
    constructor(result?: ISeason) {
        if (!result) return;
        this.id = result._id;         
        this.title = result.title;
        this.description = result.description;
        this.creatorId = result.creatorId;
        this.status = result.status;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }

}
