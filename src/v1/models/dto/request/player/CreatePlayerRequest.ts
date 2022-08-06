import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class CreatePlayerRequest {
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    @IsOptional()
    public firstName: string
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()    
    @IsOptional()
    public lastName: string
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()    
    public nickname: string
}
