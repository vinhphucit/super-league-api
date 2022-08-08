
import { ISubMatch } from "../dao/SubMatch";
import { ISeason } from "../dao/Season";
import { PlayerDomain } from "./PlayerDomain";
import { ISubMatchTeamStatistics } from "../dao/SubMatchTeamStatistics";

export class SubMatchTeamStatisticsDomain {
    team: string;
    goal: number;
    redCard: number;
    constructor() ;
    constructor(result: ISubMatchTeamStatistics | Partial<ISubMatchTeamStatistics>);
    constructor(result?: ISubMatchTeamStatistics | Partial<ISubMatchTeamStatistics>) {
        if (!result) return;          
        this.team = result.team;
        this.goal = result.goal;
        this.redCard = this.redCard;        
    }

}
