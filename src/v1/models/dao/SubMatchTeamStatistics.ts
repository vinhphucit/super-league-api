import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface ISubMatchTeamStatistics extends Document {
  team: string;
  goal: number;
  redCard: number;
}

export interface ISubMatchTeamStatisticsModel extends Model<ISubMatchTeamStatistics> {}
export const SubMatchTeamStatisticsSchema = new Schema<ISubMatchTeamStatistics>(
  {
    team: String,
    goal: Number,
    redCard: Number,
  },
  {
    timestamps: true,
  }
);
