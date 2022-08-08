import { Type } from 'class-transformer';
import {IsDefined, IsEmail, IsNotEmptyObject, IsObject, IsOptional, IsString, Length, MaxLength, ValidateNested} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";
import { SubMatchStatisticsRequest } from './SubMatchStatisticsRequest';

export class CreateSubMatchRequest {
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => SubMatchStatisticsRequest)
    home: SubMatchStatisticsRequest;
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => SubMatchStatisticsRequest)
    away: SubMatchStatisticsRequest;
}
