import { Document, Model, Schema } from "mongoose";
import { SeasonStatus } from "../../enums/SeasonStatus";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";
import { IPlayer, PlayerSchema } from "./Player";

export interface ISeason extends Document {
  title: string;
  description: string;
  creatorId: string;
  players: IPlayer[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISeasonModel extends Model<ISeason> {}
export const SeasonSchema = new Schema<ISeason>(
  {
    title: String,
    description: String,
    creatorId: String,
    players: [PlayerSchema],
    status: {
      type: String,
      enum: [SeasonStatus.NOT_STARTED, SeasonStatus.READY, SeasonStatus.ON_GOING, SeasonStatus.ENDED, SeasonStatus.CANCELLED],
      default: SeasonStatus.NOT_STARTED
    },
  },
  {
    timestamps: true,
  }
);

const Season: ISeasonModel = EzMongooseConnection.model<ISeason, ISeasonModel>(
  CollectionNames.Season,
  SeasonSchema
);

export default Season;
