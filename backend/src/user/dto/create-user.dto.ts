import { IsBoolean, IsNotEmpty, Matches, MinLength} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    password: string;

    @IsBoolean()
    admin?: boolean;
}