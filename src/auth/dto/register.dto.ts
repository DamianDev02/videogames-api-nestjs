import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    nickname?: string;

    @IsNumber()
    age: number;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;


}