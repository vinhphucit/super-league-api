import { EventSubscriber, On } from "event-dispatch";
import Container from "typedi";
import { Logger } from "../../base/utils/Logger";
import { IStandingTeam } from "../models/dao/StandingTeam";
import { ISubMatch } from "../models/dao/SubMatch";
import { StandingService } from "../services/StandingService";
import { StandingInitArgument } from "./arguments/StandingInitArgument";
import { SubMatchAddedArgument } from "./arguments/SubMatchAddedArgument";
import { SubMatchRemovedArgument } from "./arguments/SubMatchRemovedArgument";
import { SubMatchUpdatedArgument } from "./arguments/SubMatchUpdatedArgument";
import events from "./Events";

@EventSubscriber()
export default class PmsPropertySubscriber {
  @On(events.standing.init)
  public async onStandingInit(arg: StandingInitArgument) {
    try {
      const standingService = Container.get(StandingService);
      await standingService.initSeasonStanding(arg.season.id, arg.players);
    } catch (error) {
      Logger.error("error in init");
      Logger.error(error);
    }
  }

  @On(events.standing.subMatchAdded)
  public async onStandingUpdateWhenSubMatchAdded(arg: SubMatchAddedArgument) {
    try {
      const standingService = Container.get(StandingService);
      const match = arg.match;
      const newSubMatchData = arg.newSubMatch;

      if (newSubMatchData == null) return;

      const homePlayer = newSubMatchData.home.player;
      const awayPlayer = newSubMatchData.away.player;

      const oldDataResult = this.calculateResultOfCompetitors(
        match.subMatches.filter((value) => value.id !== newSubMatchData.id)
      );
      const newDataResult = this.calculateResultOfCompetitors(match.subMatches);

      const foundStanding = await standingService.getBySeasonId(
        newSubMatchData.seasonId
      );
      if (foundStanding != null) {
        for (var team of foundStanding.standingTeams) {
          if (team.player.id === homePlayer.id) {
            team.totalPoint =
              team.totalPoint -
              this.resultToPointHomeAway(oldDataResult)[0] +
              this.resultToPointHomeAway(newDataResult)[0];
            team.totalGoal +=
              match.subMatches[match.subMatches.length - 1].home.goal;
            team.totalGoalAgainst +=
              match.subMatches[match.subMatches.length - 1].away.goal;
            team.totalRedCard +=
              match.subMatches[match.subMatches.length - 1].home.redCard;
          } else if (team.player.id === awayPlayer.id) {
            team.totalPoint =
              team.totalPoint -
              this.resultToPointHomeAway(oldDataResult)[1] +
              this.resultToPointHomeAway(newDataResult)[1];
            team.totalGoal +=
              match.subMatches[match.subMatches.length - 1].away.goal;
            team.totalGoalAgainst +=
              match.subMatches[match.subMatches.length - 1].home.goal;
            team.totalRedCard +=
              match.subMatches[match.subMatches.length - 1].away.redCard;
          }
        }
        foundStanding.standingTeams = this.sortStanding(
          foundStanding.standingTeams
        );
        await standingService.save(foundStanding);
      }
    } catch (error) {
      Logger.error("error in subMatchAdded");
      Logger.error(error);
    }
  }
  @On(events.standing.subMatchUpdated)
  public async onStandingUpdateWhenSubMatchUpdated(
    arg: SubMatchUpdatedArgument
  ) {
    try {
      const standingService = Container.get(StandingService);
      const updatedMatch = arg.updatedMatch;
      const oldSubMatch = arg.oldSubMatch;

      const oldSubMatches = updatedMatch.subMatches.filter(
        (value) => value.id !== oldSubMatch.id
      );
      const newSubMatch = updatedMatch.subMatches.find(
        (value) => value.id == oldSubMatch.id
      );
      oldSubMatches.push(oldSubMatch);

      const homePlayer = oldSubMatch.home.player;
      const awayPlayer = oldSubMatch.away.player;

      const oldDataResult = this.calculateResultOfCompetitors(oldSubMatches);
      const newDataResult = this.calculateResultOfCompetitors(
        updatedMatch.subMatches
      );

      const foundStanding = await standingService.getBySeasonId(
        oldSubMatch.seasonId
      );
      if (foundStanding != null) {
        for (var team of foundStanding.standingTeams) {
          if (team.player.id === homePlayer.id) {
            team.totalPoint =
              team.totalPoint -
              this.resultToPointHomeAway(oldDataResult)[0] +
              this.resultToPointHomeAway(newDataResult)[0];
            team.totalGoal =
              team.totalGoal - oldSubMatch.home.goal + newSubMatch.home.goal;
            team.totalGoalAgainst =
              team.totalGoalAgainst -
              oldSubMatch.away.goal +
              newSubMatch.away.goal;
            team.totalRedCard =
              team.totalRedCard -
              oldSubMatch.home.redCard +
              newSubMatch.home.redCard;
          } else if (team.player.id === awayPlayer.id) {
            team.totalPoint =
              team.totalPoint -
              this.resultToPointHomeAway(oldDataResult)[1] +
              this.resultToPointHomeAway(newDataResult)[1];
            team.totalGoal =
              team.totalGoal - oldSubMatch.away.goal + newSubMatch.away.goal;
            team.totalGoalAgainst =
              team.totalGoalAgainst -
              oldSubMatch.home.goal +
              newSubMatch.home.goal;
            team.totalRedCard =
              team.totalRedCard -
              oldSubMatch.away.redCard +
              newSubMatch.away.redCard;
          }
        }
        foundStanding.standingTeams = this.sortStanding(
          foundStanding.standingTeams
        );
        await standingService.save(foundStanding);
      }
    } catch (error) {
      Logger.error("error in subMatchUpdated");
      Logger.error(error);
    }
  }
  @On(events.standing.subMatchRemoved)
  public async onStandingUpdateWhenSubMatchRemoved(
    arg: SubMatchRemovedArgument
  ) {
    try {
      const standingService = Container.get(StandingService);
      var oldSubMatches = [...arg.updatedMatch.subMatches];
      oldSubMatches.push(arg.removedSubMatch);

      const newSubMatches = arg.updatedMatch.subMatches;

      const removedSubMatch = arg.removedSubMatch;
      var oldSubMatch: ISubMatch = null;

      const homePlayer = arg.removedSubMatch.home.player;
      const awayPlayer = arg.removedSubMatch.away.player;

      const oldDataResult = this.calculateResultOfCompetitors(oldSubMatches);
      const newDataResult = this.calculateResultOfCompetitors(newSubMatches);

      const foundStanding = await standingService.getBySeasonId(
        arg.removedSubMatch.seasonId
      );
      if (foundStanding != null) {
        for (var team of foundStanding.standingTeams) {
          if (team.player.id === homePlayer.id) {
            team.totalPoint =
              team.totalPoint -
              this.resultToPointHomeAway(oldDataResult)[0] +
              this.resultToPointHomeAway(newDataResult)[0];
            team.totalGoal = team.totalGoal - removedSubMatch.home.goal;
            team.totalGoalAgainst =
              team.totalGoalAgainst - removedSubMatch.away.goal;
            team.totalRedCard =
              team.totalRedCard - removedSubMatch.home.redCard;
          } else if (team.player.id === awayPlayer.id) {
            team.totalPoint =
              team.totalPoint -
              this.resultToPointHomeAway(oldDataResult)[1] +
              this.resultToPointHomeAway(newDataResult)[1];
            team.totalGoal = team.totalGoal - removedSubMatch.away.goal;
            team.totalGoalAgainst =
              team.totalGoalAgainst - removedSubMatch.home.goal;
            team.totalRedCard =
              team.totalRedCard - removedSubMatch.away.redCard;
          }
        }
        foundStanding.standingTeams = this.sortStanding(
          foundStanding.standingTeams
        );
        await standingService.save(foundStanding);
      }
    } catch (error) {
      Logger.error("error in subMatchRemoved");
      Logger.error(error);
    }
  }
  private sortStanding(standingTeams: IStandingTeam[]): IStandingTeam[] {
    if (standingTeams == null) return [];
    return standingTeams.sort((x, y) => {
      if (x.totalPoint > y.totalPoint) {
        return -1;
      } else if (x.totalPoint < y.totalPoint) {
        return 1;
      } else {
        if (
          x.totalGoal - x.totalGoalAgainst >
          y.totalGoal - y.totalGoalAgainst
        ) {
          return -1;
        } else if (
          x.totalGoal - x.totalGoalAgainst <
          y.totalGoal - y.totalGoalAgainst
        ) {
          return 1;
        } else {
          if (x.totalGoal > y.totalGoal) {
            return -1;
          } else if (x.totalGoal < y.totalGoal) {
            return 1;
          } else {
            if (x.totalRedCard > y.totalRedCard) {
              return 1;
            } else if (x.totalGoal < y.totalGoal) {
              return -1;
            } else {
              if (x.player.nickname > x.player.nickname) {
                return 1;
              } else if (x.player.nickname < x.player.nickname) {
                return -1;
              } else {
                return 0;
              }
            }
          }
        }
      }
    });
  }

  private calculateResultOfCompetitors(subMatches: ISubMatch[]): number {
    var homeWin = 0,
      awayWin = 0;
    //calculate temp point before new match
    if (subMatches != null && subMatches.length > 0) {
      for (const m of subMatches) {
        const homeGoal = m.home.goal;
        const awayGoal = m.away.goal;
        if (homeGoal - awayGoal > 0) {
          homeWin++;
        } else if (homeGoal - awayGoal < 0) {
          awayWin++;
        }
      }
    } else {
      return -2;
    }
    if (homeWin > awayWin) {
      return 1;
    } else if (homeWin == awayWin) {
      return 0;
    } else {
      return -1;
    }
  }
  private resultToPointHomeAway(result: number): [number, number] {
    if (result == -1) return [0, 3];
    if (result == 0) return [1, 1];
    if (result == 1) return [3, 0];
    return [0, 0];
  }
}
