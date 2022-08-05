import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class UpdateSeasonRequest {
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    @IsOptional()
    public title: string
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()    
    @IsOptional()
    public description: string
}
