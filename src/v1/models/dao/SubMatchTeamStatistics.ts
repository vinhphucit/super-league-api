import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";
import { IPlayer, PlayerSchema } from "./Player";

export interface ISubMatchTeamStatistics extends Document {
  player: IPlayer,
  team: string;
  goal: number;
  redCard: number;
}

export interface ISubMatchTeamStatisticsModel extends Model<ISubMatchTeamStatistics> {}
export const SubMatchTeamStatisticsSchema = new Schema<ISubMatchTeamStatistics>(
  {
    player: PlayerSchema,
    team: String,
    goal: Number,
    redCard: Number,
  },
  {
    timestamps: true,
  }
);
