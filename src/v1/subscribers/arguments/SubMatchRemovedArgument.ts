import { ISubMatch } from "../../models/dao/SubMatch";
import { IMatch } from "../../models/dao/Match";
import { IPlayer } from "../../models/dao/Player";
import { ISeason } from "../../models/dao/Season";

export class SubMatchRemovedArgument {
  constructor(public previousMatch: IMatch, public removedSubMatch: ISubMatch) {}
}
