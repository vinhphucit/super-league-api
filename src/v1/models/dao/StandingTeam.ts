import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";
import { IPlayer, PlayerSchema } from "./Player";

export interface IStandingTeam extends Document {
  player: IPlayer;
  totalPoint: number;
  totalGoal: number;
  totalGoalAgainst: number;
  totalRedCard: number;
  totalWin: number;
  totalLose: number;
  totalDraw: number;
}

export interface IStandingTeamModel extends Model<IStandingTeam> {}
export const StandingTeamSchema = new Schema<IStandingTeam>({
  player: PlayerSchema,
  totalPoint: {
    type: Number,
    default: 0
  },
  totalGoal: {
    type: Number,
    default: 0
  },
  totalGoalAgainst: {
    type: Number,
    default: 0
  },
  totalRedCard: {
    type: Number,
    default: 0
  },
  totalWin: {
    type: Number,
    default: 0
  },
  totalLose: {
    type: Number,
    default: 0
  },
  totalDraw: {
    type: Number,
    default: 0
  },
});