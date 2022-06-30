import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MinLength} from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'juan@blabla.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Nome do usuário'
    })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
        message: "A senha deve contar letras maiúsculas, minúsculas, números e carácteres especiais."
    })
    @ApiProperty({
        description: 'Senha que deve contar letras maiúsculas, minusculas, carácteres especiais e números'
    })
    password: string;
}