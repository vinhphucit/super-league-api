import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";
import { IStandingTeam, StandingTeamSchema } from "./StandingTeam";

export interface IStanding extends Document {
  seasonId: string;
  standingTeams: IStandingTeam[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IStandingModel extends Model<IStanding> {}
export const StandingSchema = new Schema<IStanding>(
  {
    seasonId: String,
    standingTeams: [StandingTeamSchema]
  },
  {
    timestamps: true,
  }
);

const Standing: IStandingModel = EzMongooseConnection.model<IStanding, IStandingModel>(
  CollectionNames.Standing,
  StandingSchema
);

export default Standing;
