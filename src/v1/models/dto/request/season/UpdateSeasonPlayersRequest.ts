import {ArrayMinSize, IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class UpdateSeasonPlayersRequest {
    @IsString({each:true}) 
    @ArrayMinSize(1)
    public playerIds: string[]
}
