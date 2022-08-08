import { ISubMatch } from "../dao/SubMatch";
import { ISeason } from "../dao/Season";
import { PlayerDomain } from "./PlayerDomain";
import { SubMatchTeamStatisticsDomain } from "./SubMatchTeamStatisticsDomain";

export class MatchStatisticsDomain {
  home: SubMatchTeamStatisticsDomain;
  away: SubMatchTeamStatisticsDomain;
  constructor();
  constructor(result: ISubMatch);
  constructor(result?: ISubMatch) {
    if (!result) return;
    this.home = new SubMatchTeamStatisticsDomain(result.home);
    this.away = new SubMatchTeamStatisticsDomain(result.away);
  }
}
