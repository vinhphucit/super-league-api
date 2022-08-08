import {IsEmail, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class SubMatchStatisticsRequest {
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    @IsOptional()
    team: string;
    @IsNumber()
    @Min(0)
    @Max(100)
    goal: number;
    @IsNumber()
    @Min(0)
    @Max(11)
    redCard: number;
}
