import {
  ArrayMinSize,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator";
import { SeasonStatus } from "../../../../enums/SeasonStatus";
import { IsNotEmptyString } from "../../../../utils/validation/IsNotEmptyString";
const statuses = [
  SeasonStatus.NOT_STARTED,
  SeasonStatus.READY,
  SeasonStatus.ON_GOING,
  SeasonStatus.ENDED,
  SeasonStatus.CANCELLED,
] as const;
export class UpdateSeasonStatusRequest {
  @IsString()
  @IsIn(statuses)
  public status: string;
}
