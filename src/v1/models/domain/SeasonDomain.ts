import { ISeason } from "../dao/Season";
import { PlayerDomain } from "./PlayerDomain";

export class SeasonDomain {
    id: string;
    title: string;
    description: string;
    players: PlayerDomain[];
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
        this.players = result.players?.map(i=>new PlayerDomain(i));
        this.creatorId = result.creatorId;
        this.status = result.status;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }

}
