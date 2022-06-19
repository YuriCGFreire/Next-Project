import { IsBoolean, IsNotEmpty, Matches, MinLength} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
        message: "A senha deve contar letras maiúsculas, minúsculas, números e carácteres especiais."
    })
    password: string;

    admin?: boolean;
}