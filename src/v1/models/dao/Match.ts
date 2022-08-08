import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";
import { ISubMatch, SubMatchStatisticsSchema } from "./SubMatch";

import { IPlayer, PlayerSchema } from "./Player";

export interface IMatch extends Document {
  seasonId: string;
  homePlayer: IPlayer;
  awayPlayer: IPlayer;
  subMatches: ISubMatch[],
  createdAt: Date;
  updatedAt: Date;
}

export interface IMatchModel extends Model<IMatch> {}
export const MatchSchema = new Schema<IMatch>(
  {
    seasonId: String,
    homePlayer: PlayerSchema,
    awayPlayer: PlayerSchema,
    subMatches: [SubMatchStatisticsSchema],
  },
  {
    timestamps: true,
  }
);

const Match: IMatchModel = EzMongooseConnection.model<
  IMatch,
  IMatchModel
>(CollectionNames.Match, MatchSchema);

export default Match;
