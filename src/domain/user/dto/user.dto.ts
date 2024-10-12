import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto {

    @IsNotEmpty({ message: 'Name is required.' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Email is required.' })
    @IsString()
    @IsEmail({}, { message: 'Invalid email.' })
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @IsString()
    @MinLength(4, { message: 'Password min 4 characteres' })
    password: string;
}