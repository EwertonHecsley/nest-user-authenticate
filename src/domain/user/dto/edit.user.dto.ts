import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class EditUserDto {

    @IsOptional()
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Email is required.' })
    @IsString()
    @IsEmail({}, { message: 'Invalid email.' })
    email: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Password is required.' })
    @IsString()
    @MinLength(4, { message: 'Password min 4 characteres' })
    password: string;


}