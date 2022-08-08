import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class CreateSeasonRequest {
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    public title: string
    @IsString()
    @Length(1, 500)
    @IsNotEmptyString()    
    public description: string
    @IsString({each:true}) 
    @IsOptional()
    public playerIds: string[]
}
