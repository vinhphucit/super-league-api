import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";
import { ISubMatchTeamStatistics, SubMatchTeamStatisticsSchema } from "./SubMatchTeamStatistics";

export interface ISubMatch extends Document {
  matchId: string,
  seasonId: string,
  home: Partial<ISubMatchTeamStatistics>;
  away: Partial<ISubMatchTeamStatistics>;
}

export interface ISubMatchModel extends Model<ISubMatch> {}

export const SubMatchStatisticsSchema = new Schema<ISubMatch>(
  {
    matchId: String,
    seasonId: String,
    home: SubMatchTeamStatisticsSchema,
    away: SubMatchTeamStatisticsSchema,
  },
  {
    timestamps: true,
  }
);

const SubMatch: ISubMatchModel = EzMongooseConnection.model<ISubMatch, ISubMatchModel>(
  CollectionNames.SubMatch,
  SubMatchStatisticsSchema
);

export default SubMatch;
